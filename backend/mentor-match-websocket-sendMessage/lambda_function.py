import boto3
import json
import datetime
import uuid


def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str


dynamodb = boto3.resource('dynamodb')


def lambda_handler(event, context):
    try:
        # GET ATTRIBUTES
        message = json.loads(event['body'])['message']
        to = json.loads(event['body'])['to']
        fr = json.loads(event['body'])['fr']
        uuidv4 = json.loads(event['body'])['uuid']

        # CONNECTION TO GATEWAY
        apigatewaymanagementapi = boto3.client(
            'apigatewaymanagementapi',
            endpoint_url = "https://" + event["requestContext"]["domainName"] + "/" + event["requestContext"]["stage"]
        )

        ### RESTRICT NUMBER OF MESSAGES
        table_user_data = dynamodb.Table('mentor-match-user-data')
        response_user_data = table_user_data.get_item(Key={'email': fr})
        if "Item" not in response_user_data:
            apigatewaymanagementapi.post_to_connection(
                Data=json.dumps({
                    "status": 404,
                    "text": "Resource Not Found",
                    "error": "email is not found"
                }),
                ConnectionId=event["requestContext"]["connectionId"]
            )
            return {}
        if response_user_data["Item"]["plan"] == 'free':
            table_user = dynamodb.Table('mentor-match-user')
            response_user = table_user.get_item(Key={'email': fr})
            if response_user["Item"]["interactions"] < 5:
                response_user["Item"]["interactions"] += 1
                table_user.put_item(Item=response_user["Item"])
            else:
                apigatewaymanagementapi.post_to_connection(
                    Data=json.dumps({
                        "status": 429,
                        "text": "Too Many Requests",
                        "error": "maximum number of messages reached"
                    }),
                    ConnectionId=event["requestContext"]["connectionId"]
                )
                return {}
        ###

        # CONNECTION TO DYNAMODB
        table = dynamodb.Table('mentor-match-chat')
        response = table.get_item(Key={'uuid': uuidv4})
        uuidmssg = str(uuid.uuid4())

        response["Item"]["messages"].append(
            {
                "date": timestamp_to_str(datetime.datetime.now()),
                "user": fr,
                "content": message,
                "uuid": uuidmssg
            }
        )
        response2 = table.put_item(Item=response["Item"])

        # MESSAGE TO SAME USER
        apigatewaymanagementapi.post_to_connection(
            Data=json.dumps(response["Item"]),
            ConnectionId=event["requestContext"]["connectionId"]
        )
        # MESSAGE TO THE USER
        table_user = dynamodb.Table('mentor-match-user')
        response_user = table_user.get_item(Key={"email": to})

        connectionId = response_user["Item"]["connectionId"]
        if connectionId != "":
            table_connection = dynamodb.Table('mentor-match-websocket-connection')
            response_connection = table_connection.get_item(Key={"connectionId": connectionId})
            if "Item" in response_connection:
                apigatewaymanagementapi.post_to_connection(
                    Data=json.dumps(response["Item"]),
                    ConnectionId=connectionId
                )

        # POST TO SNS
        sns = boto3.client('sns')
        link = 'http://mentor-match.s3-website-us-east-1.amazonaws.com/'

        response_sns = sns.publish(
        	TopicArn = 'arn:aws:sns:us-east-1:002237945535:mentor-match-sns',
        	Subject = 'Mentor Match - Nuevo Mensaje',
            Message = f'Recibiste un mensaje nuevo de {fr}: {message}. Entra a {link} para contestar el mensaje.',
            MessageAttributes = {
                'email': {'DataType': 'String', 'StringValue': to }
            }
        )

    except Exception as e:
        apigatewaymanagementapi = boto3.client(
            'apigatewaymanagementapi',
            endpoint_url = "https://" + event["requestContext"]["domainName"] + "/" + event["requestContext"]["stage"]
        )
        apigatewaymanagementapi.post_to_connection(
            Data=f"Error: {e}",
            ConnectionId=event["requestContext"]["connectionId"]
        )
    return {}