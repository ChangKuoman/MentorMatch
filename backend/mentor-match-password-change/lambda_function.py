import boto3
import hashlib

def verify_password(password, hashed_password):
    """Verifies a password against a hashed password."""
    hash_object = hashlib.sha256()
    hash_object.update(password.encode('utf-8'))
    hashed_password_new = hash_object.hexdigest()
    return hashed_password_new == hashed_password

def hash_password(password):
    """Hashes a password using SHA-256."""
    hash_object = hashlib.sha256()
    hash_object.update(password.encode('utf-8'))
    return hash_object.hexdigest()

def lambda_handler(event, context):
    try:
        email = event["email"]
        password = event["password"]
        new_password = event["new_password"]
        
        # conexión con dynamodb
        dynamodb = boto3.resource('dynamodb')
        table_user = dynamodb.Table('mentor-match-user')
        
        # verificar si existe el mismo email
        response = table_user.get_item(Key={'email': email})
        if 'Item' in response:
            item = response["Item"]
            # existe
            if (verify_password(password, response["Item"]["password"])):
                item["password"] = hash_password(new_password)
                response = table_user.put_item(Item=item)
                if (response["ResponseMetadata"]["HTTPStatusCode"] == 200):
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

    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }