import boto3
import hashlib

def verify_password(password, hashed_password):
    """Verifies a password against a hashed password."""
    hash_object = hashlib.sha256()
    hash_object.update(password.encode('utf-8'))
    hashed_password_new = hash_object.hexdigest()
    return hashed_password_new == hashed_password
 
def lambda_handler(event, context):
    try:
        email = event["email"]
        password = event["password"]
        
        # conexión con dynamodb
        dynamodb = boto3.resource('dynamodb')
        table_user = dynamodb.Table('mentor-match-user')
        
        # verificar si existe el mismo email
        response = table_user.get_item(Key={'email': email})
        if 'Item' in response:
            item = response["Item"]
            # existe
            if (verify_password(password, response["Item"]["password"])):
                # eliminar
                client = boto3.client('dynamodb')
                transacciones = client.transact_write_items(TransactItems=[
                    {
                        "Delete": {
                            "TableName": "mentor-match-user",
                            "Key": {
                                "email": {"S": email}
                            }
                        }
                    },
                    {
                        "Delete": {
                            "TableName": "mentor-match-data",
                            "Key": {
                                "email": {"S": email}
                            }
                        }
                    },
                ])
                if (transacciones["ResponseMetadata"]["HTTPStatusCode"] == 200):
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
            else:
                return {
                    "status": 400,
                    "text": "Bad Request",
                    "error": "Wrong password"
                }

        else:
            # no existe
            return {
                "status": 400,
                "text": "Bad Request"
            }

    except Exception as e:
        return {
            "error": str(e),
            "status": 500,
            "text": "Internal Server Error"
        }