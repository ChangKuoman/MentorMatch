import boto3

def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('mentor-match-qualification')
        
        response = table.scan()
        value = 0
        if (response["ResponseMetadata"]["HTTPStatusCode"] == 200):
            for element in response["Items"]:
                value += element["number"]
            return {
                    "status": 200,
                    "text": "Ok",
                    "total": value/response["Count"]
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
