import boto3
import hashlib
import json
import datetime


def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str


def hash_password(password):
  """Hashes a password using SHA-256."""
  hash_object = hashlib.sha256()
  hash_object.update(password.encode('utf-8'))
  return hash_object.hexdigest()


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
        map = check_attributes(event, ["email", "name", "surname", "documentType", "documentNro", "password", "birthDate"])
        if map["ok"] == False:
            error = ",".join(map["needed"])
            error += " attributes are needed in payload"
            return {
                "status": 400,
                "text": "Bad Request",
                "error": error
            }

        # OBTAIN ATTRIBUTES OF EVENT
        email = event["email"]
        name = event["name"]
        surname = event["surname"]
        documentType = event["documentType"]
        documentNro = event["documentNro"]
        password = event["password"]
        birthDate = event["birthDate"]

        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_user = dynamodb.Table('mentor-match-user')
        table_user_data = dynamodb.Table('mentor-match-user-data')

        # VERIFY EMAIL EXISTS
        email_exists = False
        response = table_user.get_item(Key={'email': email})
        if 'Item' in response:
            email_exists = True

        # VERIFY DOCUMENT EXISTS
        document_exists = False
        response = table_user.scan()
        for item in response['Items']:
            if item["document"] == [documentType, documentNro]:
                document_exists = True

        error = " already exists"
        if email_exists and document_exists:
            error = "Email and Document" + error
        elif email_exists:
            error = "Email" + error
        elif document_exists:
            error = "Document" + error

        if email_exists or document_exists:
            return {
                "status": 400,
                "text": "Bad Request",
                "error": error
            }

        # CREATE ITEMS
        item_user = {
            "email": email,
            "password": hash_password(password),
            "document": [documentType, documentNro],
            "blockDate": "",
            "unlockDate": "",
            "attemps": 0,
            "connectionId": "",
            "creationDate": timestamp_to_str(datetime.datetime.now()),
            "interactions": 0
        }

        item_user_data = {
            "email": email,
            "name": name,
            "surname": surname,
            "birthDate": birthDate,
            "description": "",
            "verified": False,
            "qualification": [0, 0],
            "chats": [],
            "tags": [],
            "photo": "",
            "events-r": [],
            "events-g": [],
            "superuser": False,
            "plan": "free",
            "planDateV": ""
        }

        # PUT ITEMS
        table_user.put_item(Item=item_user)
        table_user_data.put_item(Item=item_user_data)

        # SUBSCRIPTION TO SNS
        sns = boto3.client('sns')

        topic_arn = 'arn:aws:sns:us-east-1:002237945535:mentor-match-sns'

        response = sns.subscribe(
            TopicArn=topic_arn,
            Protocol='email',
            Endpoint=email,
            Attributes={
               'FilterPolicy': json.dumps({
                   'email': [
                       email
                   ]
               })
            }
        )

        return {
            "status": 200,
            "text": "Ok",
            "users": [item_user_data],
            "total": 1
        }

    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }