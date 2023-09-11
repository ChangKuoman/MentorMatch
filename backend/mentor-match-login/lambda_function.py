import boto3
import hashlib
import datetime

def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str

def str_to_timestamp(timestamp_str):
    """Convierte una cadena de timestamp en un objeto datetime."""
    timestamp = datetime.datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')
    return timestamp

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
            # si esta bloqueado
            if (item["blockDate"] == "" or str_to_timestamp(item["unlockDate"]) < datetime.datetime.now()):
                if (item["blockDate"] != "" and str_to_timestamp(item["unlockDate"]) < datetime.datetime.now()):
                    item["unlockDate"] = ""
                    item["blockDate"] = ""
                    item["attemps"] = 0
 
                if (verify_password(password, response["Item"]["password"])):
                    return {
                        "status": 200,
                        "text": "Ok",
                        "email": email
                    }
                else:
                    item["attemps"] += 1
                    if item["attemps"] >= 3:
                        # bloquearlo
                        current_timestamp = datetime.datetime.now()
                        current_timestamp_plus_one = current_timestamp + datetime.timedelta(hours=1)
                        item["blockDate"] = timestamp_to_str(current_timestamp)
                        item["unlockDate"] = timestamp_to_str(current_timestamp_plus_one)
                    # actualiza el attemps
                    table_user.put_item(Item=item)
                    
                    return {
                        "status": 400,
                        "text": "Bad Request",
                        "error": "Password incorrect",
                        "attemps": item["attemps"]
                    }
            else:
                return {
                    "status": 400,
                    "text": "Bad Request",
                    "error": "Too many attemps",
                    "unlockDate": item["unlockDate"]
                }
        else:
            # no existe
            return {
                "status": 400,
                "text": "Bad Request",
                "error": "Invalid email"
            }

    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }
