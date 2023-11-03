import boto3
import datetime
import uuid


def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str


def check_attributes(event, list_attributes):
    map = {
        "ok": True,
        "needed": []
    }
    for attribute in list_attributes:
        if attribute not in event:
            map["needed"].append(attribute)
            map["ok"] = False
    return map


def lambda_handler(event, context):
    try:
        # CHECK ATTRIBUTES IN EVENT
        map = check_attributes(event, ["chat", "message", "fr", "to"])
        if map["ok"] == False:
            error = ",".join(map["needed"])
            error += " attributes are needed in payload"
            return {
                "status": 400,
                "text": "Bad Request",
                "error": error
            }

        # OBTAIN ATTRIBUTES OF EVENT
        chat_uuid = event["chat"]
        message = event["message"]
        fr = event["fr"]
        to = event["to"]

        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_chat = dynamodb.Table('mentor-match-chat')

        response = table_chat.get_item(Key={'uuid': chat_uuid})
        uuidmssg = str(uuid.uuid4())
        response["Item"]["messages"].append(
            {
                "date": timestamp_to_str(datetime.datetime.now()),
                "user": fr,
                "content": message,
                "uuid": uuidmssg
            }
        )
        response2 = table_chat.put_item(Item=response["Item"])

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

        return {
            "status": 200,
            "text": "Ok",
            "total": 1,
            "chats": [response["Item"]]
        }

    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }