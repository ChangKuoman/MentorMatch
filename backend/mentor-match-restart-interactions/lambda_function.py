import boto3


def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table_user = dynamodb.Table('mentor-match-user')
        response = table_user.scan()
        
        for user in response["Items"]:
            user["interactions"] = 0
            table_user.put_item(Item=user)
            
    except Exception as e:
        print(e)
    
    return {}