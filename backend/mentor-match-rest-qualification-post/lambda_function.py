import boto3
import uuid
import datetime


def timestamp_to_str(timestamp):
    """Convert a timestamp in datetime format to a string."""
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
        map = check_attributes(event, ["email", "qualification"])
        if map["ok"] == False:
            error = ",".join(map["needed"])
            error += " attributes are needed in payload"
            return {
                "status": 400,
                "text": "Bad Request",
                "error": error
            }
        
        # OBTAIN THE VALUES
        email = event["email"]
        qualification = event["qualification"]
        
        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_user = dynamodb.Table('mentor-match-user')
        
        # VERIFIES IF EMAIL EXISTS
        response = table_user.get_item(Key={'email': email})
        if 'Item' not in response:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid email"
            }
        
        # IF QUALIFICATION IS NOT IN RANGE
        if (qualification < 0 or qualification > 5):
            return {
                "status": 400,
                "text": "Bad Request",
                "error": "Qualification is not in range"
            }
    
        item = {
            "email": email,
            "qualification": qualification,
            "uuid": str(uuid.uuid4()),
            "date": timestamp_to_str(datetime.datetime.now())
        }
        if "comment" in event:
            item["comment"] = event["comment"]
    
        table_qualification = dynamodb.Table('mentor-match-qualification')
        response = table_qualification.put_item(Item=item)

        return {
            "status": 200,
            "text": "Ok"
        }
    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }
