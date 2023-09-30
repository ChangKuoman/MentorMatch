import boto3
import datetime

def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str
    
def lambda_handler(event, context):
    try:
        # Obtain attributes of event
        email = event["email"]
        course = event["course"]
        
        # Connection to dynamodb
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('mentor-match-publication')
        
        # IF EXISTS
        response = table.get_item(Key={'email': email, 'c_code': course})
        if "Item" in response:
            response["Item"]["active"] = False
            response["Item"]["date"] = timestamp_to_str(datetime.datetime.now())
            response_dynamo = table.put_item(Item=response["Item"])
            
            if response_dynamo["ResponseMetadata"]["HTTPStatusCode"] == 200:
                return {
                    "status": 200,
                    "text": "Ok",
                    "publication": [response["Item"]]
                }
            else:
                return {
                    "status": 500,
                    "text": "Internal Server Error"
                }
        
        # IF NOT EXISTS
        else:
            return {
                "status": 400,
                "text": "Bad Request"
            }

    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }