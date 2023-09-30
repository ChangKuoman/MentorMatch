import boto3

def lambda_handler(event, context):
    try:
        uuidv4 = event['uuid']
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('mentor-match-chat')
        response = table.get_item(Key={'uuid': uuidv4})
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