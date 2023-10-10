import boto3
import uuid
import datetime


def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str


def check_attributes(event, list_attributes):
    map = {
        "ok": True,
        "needed": []
    }
    for attribute in list_attributes:
        if attribute not in event:
            map["needed"].append(attribute)
            map["ok"] = False
    return map
    
    
def lambda_handler(event, context):
    try:
        # CHECK ATTRIBUTES IN EVENT
        map = check_attributes(event, ["email_receiver", "email_giver", "tag"])
        if map["ok"] == False:
            error = ",".join(map["needed"])
            error += " attributes are needed in payload"
            return {
                "status": 400,
                "text": "Bad Request",
                "error": error
            }

        # OBTAIN ATTRIBUTES OF EVENT
        email_receiver = event["email_receiver"]
        email_giver = event["email_giver"]
        tag = event["tag"]

        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_user_data = dynamodb.Table('mentor-match-user-data')

        # VERIFIES IF EMAIL EXISTS
        response_giver = table_user_data.get_item(Key={'email': email_giver})
        if 'Item' not in response_giver:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid giver email"
            }
        # VERIFIES IF EMAIL EXISTS
        response_receiver = table_user_data.get_item(Key={'email': email_receiver})
        if 'Item' not in response_receiver:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid receiver email"
            }

        uuidv4 = str(uuid.uuid4())
        
        # CREATE EVENT ITEM
        item_event = {
            "uuid": uuidv4,
            "email_giver": email_giver,
            "email_receiver": email_receiver,
            "state": 0,
            "tag": tag,
            "date": timestamp_to_str(datetime.datetime.now()),
            "qualified": False,
        }

        # APPEND UUID OF EVENT
        response_giver["Item"]["events-g"].append(uuidv4)
        response_receiver["Item"]["events-r"].append(uuidv4)

        table_user_data.put_item(Item=response_giver["Item"])
        table_user_data.put_item(Item=response_receiver["Item"])
        
        table_event = dynamodb.Table('mentor-match-event')
        table_event.put_item(Item=item_event)

        return {
            "status": 200,
            "text": "Ok",
            "events": [item_event],
            "total": 1
        }

    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }


