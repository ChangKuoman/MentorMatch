import boto3
import hashlib


def verify_password(password, hashed_password):
    """Verifies a password against a hashed password."""
    hash_object = hashlib.sha256()
    hash_object.update(password.encode('utf-8'))
    hashed_password_new = hash_object.hexdigest()
    return hashed_password_new == hashed_password
 

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
        map = check_attributes(event, ["email", "password"])
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
        password = event["password"]
        
        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_user = dynamodb.Table('mentor-match-user')
        table_user_data = dynamodb.Table('mentor-match-user-data')
        
        # VERIFIES IF EMAIL EXISTS
        response = table_user.get_item(Key={'email': email})
        if 'Item' not in response:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid email"
            }
    
        item = response["Item"]

        if (verify_password(password, response["Item"]["password"])):
            # DELETE ITEMS 
            table_user.delete_item(Key={"email": email})
            table_user_data.delete_item(Key={"email": email})
            return {
                "status": 200,
                "text": "Ok"
            }

        else:
            return {
                "status": 401,
                "text": "Unauthorized",
                "error": "Incorrect password"
            }

    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }