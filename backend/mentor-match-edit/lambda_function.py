import boto3

def lambda_handler(event, context):
    try:
        email = event["email"]
        name = event["name"]
        content = event["content"]
        
        # conexión con dynamodb
        dynamodb = boto3.resource('dynamodb')
        table_data = dynamodb.Table('mentor-match-data')
        
        # verificar si existe el mismo email
        response = table_data.get_item(Key={'email': email})
        if 'Item' in response:
            item = response["Item"]
            # existe
            if (name != "" and name != item["name"]):
                item["name"] = name

            item['content'] = content

            response = table_data.put_item(Item=item)
            if (response["ResponseMetadata"]["HTTPStatusCode"] == 200):
                return {
                    "status": 200,
                    "text": "Ok",
                    "data": [item]
                }
            else:
                return {
                    "status": 500,
                    "text": "Internal Server Error"
                }
        else:
            return {
                "status": 400,
                "text": "Bad Request"
            }

    except Exception as e:
        return {
            "error": str(e),
            "status": 500,
            "text": "Internal Server Error"
        }