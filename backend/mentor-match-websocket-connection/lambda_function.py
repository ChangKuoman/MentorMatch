import boto3

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    connectionId = event['requestContext']['connectionId']

    dynamodb.put_item(
        TableName='mentor-match-websocket-connection',
        Item={'connectionId': {'S': connectionId}}
    )

    return {}