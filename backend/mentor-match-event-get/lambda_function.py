import boto3
from boto3.dynamodb.conditions import Key

# GET EVENT
def lambda_handler(event, context):
    try:
        # Connection to dynamodb
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('mentor-match-event')
        
        # CASO 1: obtenemos event por el uuid
        if "uuid" in event:
            uuidv4 = event["uuid"]
            response = table.get_item(Key={'uuid': uuidv4})
            return {
                "status": 200,
                "text": "Ok",
                "events": [response["Item"]]
            }
        # CASO 2: obtenemos TODOS los eventos de email con curso
        if "email" in event and "course" in event:
            email = event["email"]
            course = event["course"]

            response = table.query(
                IndexName='email_receiver-course-index',
                KeyConditionExpression="email_receiver = :partitionkeyval AND course = :sortkeyval",
                ExpressionAttributeValues={
                    ':partitionkeyval': email,
                    ':sortkeyval': course,
                }
            )
            return {
                "status": 200,
                "text": "Ok",
                "events": response["Items"]
            }
            
        # CASO 3: obtenemos TODOS los eventos de email
        if "email" in event:
            email = event["email"]
            
            response = table.query(
                IndexName='email_receiver-course-index',
                KeyConditionExpression=Key('email_receiver').eq(email),
            )
            return {
                "status": 200,
                "text": "Ok",
                "events": response["Items"]
            }
        
        return {
            "status": 400,
            "text": "Bad Request"
        }

    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }


