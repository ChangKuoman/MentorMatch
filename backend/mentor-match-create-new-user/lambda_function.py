import boto3
import hashlib

def hash_password(password):
  """Hashes a password using SHA-256."""
  hash_object = hashlib.sha256()
  hash_object.update(password.encode('utf-8'))
  return hash_object.hexdigest()

def lambda_handler(event, context):
    try:
        # Obtenemos los aributos de event
        name = event["name"]
        email = event["email"]
        password = event["password"]
        typeDocument = event["typeDocument"]
        nroDocument = event["nroDocument"]

        # conexión con dynamodb
        dynamodb = boto3.resource('dynamodb')
        table_user = dynamodb.Table('mentor-match-user')

        # verificar si existe el mismo email
        email_exists = False
        response = table_user.get_item(Key={'email': email})
        if 'Item' in response:
            email_exists = True

        # verificar si existe el mismo (typeDoc, nroDoc)
        document_exists = False
        response = table_user.scan()
        for item in response['Items']:
            if item["document"] == [typeDocument, nroDocument]:
                document_exists = True

        if email_exists or document_exists:
            return {
                "status": 400,
                "text": "Bad Request",
                "email_exists": email_exists,
                "document_exists": document_exists
            }

        # creamos items
        item_user = {
            "email": {"S": email},
            "password": {"S": hash_password(password)},
            "document": {"L": [{"S": typeDocument}, {"S": nroDocument}]},
            "blockDate": {"S": ""},
            "unlockDate": {"S": ""},
            "attemps": {"N": "0"},
        }

        item_data = {
            "email": {"S": email},
            "name": {"S": name},
            "content": {"M": {
                "events-g": {"L": []},
                "events-r": {"L": []},
                "chats": {"L": []}
            }},
        }

        client = boto3.client('dynamodb')
        transacciones = client.transact_write_items(TransactItems=[
            {
                "Put": {
                    "TableName": "mentor-match-user",
                    "Item": item_user,
                }
            },
            {
                "Put": {
                    "TableName": "mentor-match-data",
                    "Item": item_data,
                }
            },
        ])

        if transacciones["ResponseMetadata"]["HTTPStatusCode"] == 200:
            return {
                "status": 200,
                "text": "Ok",
                "email": email
            }
        else:
            return {
                "status": 500,
                "text": "Internal Server Error"
            }

    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }


