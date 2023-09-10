import boto3

def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table_data = dynamodb.Table('mentor-match-data')
        
        if "email" in event:
            email = event["email"]
            
            item = table_data.get_item(Key={'email': email})
            
            if "Item" in item:
                return {
                    "status": 200,
                    "text": "Ok",
                    "total": 1,
                    "data": [item["Item"]]
                }
            
            else:
                return {
                    "status": 400,
                    "text": "Bad Request"
                }

        response = table_data.scan()
        if (response["ResponseMetadata"]["HTTPStatusCode"] == 200):
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
    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }