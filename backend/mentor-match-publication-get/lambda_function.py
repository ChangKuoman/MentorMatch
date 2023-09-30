import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    try:
        # Connection to dynamodb
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('mentor-match-publication')
        
        # Obtain attributes of event
        if "course" in event:
            course = event["course"]

            response = table.query(
                IndexName='c_code-index',
                KeyConditionExpression=Key('c_code').eq(course),
                FilterExpression=Attr('active').eq(True)
            )
            if 'Items' in response:
                # items = response['Items']
                return {
                    "status": 200,
                    "text": "Ok",
                    "total": response["Count"],
                    "data": response["Items"]
                }
            else:
                return {
                    "status": 500,
                    "text": "Internal Server Error"
                }
        else:
            response = table.scan()
            if (response["ResponseMetadata"]["HTTPStatusCode"] == 200):
                return {
                    "status": 200,
                    "text": "Ok",
                    "total": response["Count"],
                    "data": response["Items"]
                }
    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }