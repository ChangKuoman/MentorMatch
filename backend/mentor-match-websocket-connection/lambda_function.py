import boto3

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    connectionId = event['requestContext']['connectionId']

    dynamodb.put_item(
        TableName='websocket-connections',
        Item={'connectionId': {'S': connectionId}}
    )

    return {}