import boto3
import json
import datetime


def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str
    
    
dynamodb = boto3.resource('dynamodb')


def lambda_handler(event, context):
    try:
        message = json.loads(event['body'])['message']
        to = json.loads(event['body'])['to']
        fr = json.loads(event['body'])['fr']
        uuidv4 = json.loads(event['body'])['uuid']
    
        table = dynamodb.Table('mentor-match-chat')
        response = table.get_item(Key={'uuid': uuidv4})
        
        response["Item"]["messages"].append(
            {
                "date": timestamp_to_str(datetime.datetime.now()),
                "user": fr,
                "content": message
            }
        )
        response2 = table.put_item(Item=response["Item"])

        apigatewaymanagementapi = boto3.client(
            'apigatewaymanagementapi', 
            endpoint_url = "https://" + event["requestContext"]["domainName"] + "/" + event["requestContext"]["stage"]
        )
    
        # TO SAME USER
        apigatewaymanagementapi.post_to_connection(
            Data=message,
            ConnectionId=event["requestContext"]["connectionId"]
        ) 
        # TO THE USER
        table_user = dynamodb.Table('mentor-match-user')
        response_user = table_user.get_item(Key={"email": to})
        connectionId = response_user["Item"]["connectionId"]
        if connectionId != "":
            table_connection = dynamodb.Table('websocket-connections')
            response_connection = table_connection.get_item(Key={"connectionId": connectionId})
            
            if "Item" in response_connection:
                apigatewaymanagementapi.post_to_connection(
                    Data=message,
                    ConnectionId=connectionId
                )
    except Exception as e:
        apigatewaymanagementapi = boto3.client(
            'apigatewaymanagementapi', 
            endpoint_url = "https://" + event["requestContext"]["domainName"] + "/" + event["requestContext"]["stage"]
        )
        apigatewaymanagementapi.post_to_connection(
            Data=f"{e}",
            ConnectionId=event["requestContext"]["connectionId"]
        )
    return {}