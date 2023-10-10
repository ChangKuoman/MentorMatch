import boto3

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    connectionId = event['requestContext']['connectionId']

    dynamodb.delete_item(
        TableName='websocket-connections',
        Key={'connectionId': {'S': connectionId}}
    )

    return {}