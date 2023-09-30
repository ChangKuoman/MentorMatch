import boto3
import datetime

def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str
    
def lambda_handler(event, context):
    try:
        uuidv4 = event["uuid"]
        text = event["text"]
        user = event["email"]
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('mentor-match-chat')
        response = table.get_item(Key={'uuid': uuidv4})
        
        response["Item"]["messages"].append(
            {
                "date": timestamp_to_str(datetime.datetime.now()),
                "user": user,
                "content": text
            }
        )
        response2 = table.put_item(Item=response["Item"])
        return {
            "status": 200,
            "text": "Ok",
            "chats": [response["Item"]]
        }
        
    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }
