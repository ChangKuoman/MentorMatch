import boto3
import uuid

def lambda_handler(event, context):
    try:
        # VALUES ARE NOT IN EVENT
        if ("email" not in event or "number" not in event):
            return {
                "status": 400,
                "text": "Bad Request"
            }
        
        # OBTAIN THE VALUES
        email = event["email"]
        number = event["number"]
        
        # IF VALUES ARE NOT WHAT EXPECTED
        if (email == "" or number == "" or number < 0 or number > 5):
            return {
                "status": 400,
                "text": "Bad Request"
            }
    
        item = {
            "email": email,
            "number": number,
            "uuid4": str(uuid.uuid4())
        }
        if "comment" in event:
            item["comment"] = event["comment"]
    
        # CONECTION TO DYNAMODB
        dynamodb = boto3.resource('dynamodb')
        
        # CHECK EMAIL EXISTS IN DB
        table_user = dynamodb.Table('mentor-match-user')
        response = table_user.get_item(Key={'email': email})
        if 'Item' not in response:
            return {
                "status": 403,
                "text": "Forbidden"
            }
        
        table = dynamodb.Table('mentor-match-qualification')
        
        response = table.put_item(Item=item)
        if (response["ResponseMetadata"]["HTTPStatusCode"] == 200):
            return {
                "status": 200,
                "text": "Ok"
            }
        else:
            return {
                "status": 500,
                "text": "Internal Server Error"
            }
    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }
