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
        map = check_attributes(event, ["emails"])
        if map["ok"] == False:
            error = ",".join(map["needed"])
            error += " attributes are needed in payload"
            return {
                "status": 400,
                "text": "Bad Request",
                "error": error
            }
            
        # OBTAIN ATTRIBUTES OF EVENT
        emails = event["emails"]
            
        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_user_data = dynamodb.Table('mentor-match-user-data')
        
        if emails != []:
            total = 0
            users = []

            for email in emails:            
                response = table_user_data.get_item(Key={'email': email})
                if "Item" in response:
                    total += 1
                    users.append(response["Item"])
                    
            return {
                "status": 200,
                "text": "Ok",
                "total": total,
                "users": users
            }

        response = table_user_data.scan()
        return {
            "status": 200,
            "text": "Ok",
            "total": response["Count"],
            "users": response["Items"]
        }

    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }