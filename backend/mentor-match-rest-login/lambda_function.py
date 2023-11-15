import boto3
import hashlib
import datetime


def timestamp_to_str(timestamp):
    """Convert a timestamp in datetime format to a string."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str


def str_to_timestamp(timestamp_str):
    """Convert a timestamp string to a datetime object."""
    timestamp = datetime.datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')
    return timestamp


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
        
        # VERIFIES IF EMAIL EXISTS
        response = table_user.get_item(Key={'email': email})
        if 'Item' not in response:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid email"
            }
        
        item = response["Item"]

        # CHECK IF USER NOT IS BLOCKED
        if (item["blockDate"] == "" or str_to_timestamp(item["unlockDate"]) < datetime.datetime.now()):
            if (item["blockDate"] != "" and str_to_timestamp(item["unlockDate"]) < datetime.datetime.now()):
                item["unlockDate"] = ""
                item["blockDate"] = ""
                item["attemps"] = 0
                table_user.put_item(Item=item)

            if (verify_password(password, response["Item"]["password"])):
                item["unlockDate"] = ""
                item["blockDate"] = ""
                item["attemps"] = 0
                table_user.put_item(Item=item)
                table_user_data = dynamodb.Table('mentor-match-user-data')
                response = table_user_data.get_item(Key={'email': email})
                print(f"INF,{email}")
                return {
                    "status": 200,
                    "text": "Ok",
                    "users": [response["Item"]],
                    "total": 1
                }
            else:
                item["attemps"] += 1
                if item["attemps"] >= 3:
                    # BLOCK USER
                    current_timestamp = datetime.datetime.now()
                    current_timestamp_plus_one = current_timestamp + datetime.timedelta(hours=1)
                    item["blockDate"] = timestamp_to_str(current_timestamp)
                    item["unlockDate"] = timestamp_to_str(current_timestamp_plus_one)
                # UPDATE ATTEMPS
                table_user.put_item(Item=item)
                
                return {
                    "status": 401,
                    "text": "Unauthorized",
                    "error": "Incorrect password",
                    "attemps": item["attemps"]
                }
        else:
            # THIS USER IS BLOCKED
            return {
                "status": 429,
                "text": "Too Many Requests",
                "error": "Too many attemps",
                "unlockDate": item["unlockDate"]
            }

    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }
