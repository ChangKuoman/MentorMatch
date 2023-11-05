import boto3
import json


dynamodb = boto3.resource('dynamodb')


def lambda_handler(event, context):
    try:
        email = json.loads(event['body'])['email']
        connectionId = event["requestContext"]["connectionId"]

        table_user = dynamodb.Table('mentor-match-user')
        response = table_user.get_item(Key={'email': email})

        response["Item"]["connectionId"] = connectionId
        response2 = table_user.put_item(Item=response["Item"])

        apigatewaymanagementapi = boto3.client(
            'apigatewaymanagementapi',
            endpoint_url = "https://" + event["requestContext"]["domainName"] + "/" + event["requestContext"]["stage"]
        )

        apigatewaymanagementapi.post_to_connection(
            Data=json.dumps({
                    "status": 200,
                    "text": "Ok",
                    "email": email,
                    "action": "setEmail"
                }),
            ConnectionId=connectionId
        )
    except Exception as e:
        apigatewaymanagementapi = boto3.client(
            'apigatewaymanagementapi',
            endpoint_url = "https://" + event["requestContext"]["domainName"] + "/" + event["requestContext"]["stage"]
        )

        apigatewaymanagementapi.post_to_connection(
            Data=json.dumps({
                    "status": 500,
                    "text": "Internal Server Error",
                    "error": e,
                    "action": "setEmail"
                }),
            ConnectionId=connectionId
        )
    return {}
