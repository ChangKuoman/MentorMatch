import boto3


def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('mentor-match-qualification')
        
        response = table.scan()
        value = 0

        if(len(response["Items"]) == 0):
            return {
                "status": 200,
                "text": "Ok",
                "total": -1
            }
        for element in response["Items"]:
            value += element["qualification"]
        return {
                "status": 200,
                "text": "Ok",
                "total": value/response["Count"]
            }

    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }
