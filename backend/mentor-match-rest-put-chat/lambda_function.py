import boto3
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
        map = check_attributes(event, ["chat", "message", "user"])
        if map["ok"] == False:
            error = ",".join(map["needed"])
            error += " attributes are needed in payload"
            return {
                "status": 400,
                "text": "Bad Request",
                "error": error
            }

        # OBTAIN ATTRIBUTES OF EVENT
        chat_uuid = event["chat"]
        message = event["message"]
        fr = event["user"]

        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_chat = dynamodb.Table('mentor-match-chat')

        response = table_chat.get_item(Key={'uuid': chat_uuid})

        response["Item"]["messages"].append(
            {
                "date": timestamp_to_str(datetime.datetime.now()),
                "user": fr,
                "content": message
            }
        )
        response2 = table_chat.put_item(Item=response["Item"])

        return {
            "status": 200,
            "text": "Ok",
            "total": 1,
            "chats": [response["Item"]]
        }

    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }