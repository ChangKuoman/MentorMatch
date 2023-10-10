import boto3


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
        map = check_attributes(event, ["email", "qualification"])
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
        qualification = event["qualification"]
        
        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_user_data = dynamodb.Table('mentor-match-user-data')
        
        # VERIFIES IF EMAIL EXISTS
        response = table_user_data.get_item(Key={'email': email})
        if 'Item' not in response:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid email"
            }
            
        # UPDATES QUALIFICATION
        item = response["Item"]
        item["qualification"][0] += 1
        item["qualification"][1] += qualification
        response = table_user_data.put_item(Item=item)

        return {
            "status": 200,
            "text": "Ok",
            "users": [item],
            "total": 1
        }

    except Exception as e:
        return {
            "error": str(e),
            "status": 500,
            "text": "Internal Server Error"
        }