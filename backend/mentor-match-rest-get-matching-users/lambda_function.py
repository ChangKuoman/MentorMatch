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
        map = check_attributes(event, ["email"])
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
            
        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_event = dynamodb.Table('mentor-match-event')
        table_user_data = dynamodb.Table('mentor-match-user-data')
        
        # VERIFIES IF EMAIL EXISTS
        response = table_user_data.get_item(Key={'email': email})
        if 'Item' not in response:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid email"
            }
        
        response_users = table_user_data.scan()
        response_events = table_event.scan()
        
        lista_a = response_users["Items"]
        lista_b = response_events["Items"]
        
        elementos_seleccionados = [
            item for item in lista_a
            if item["email"] != email
            and (item["email"] not in [x["email_giver"] for x in lista_b if x["state"] in [0, 1] and x["email_receiver"] == email])
        ]
        
        return {
            "status": 200,
            "text": "Ok",
            "users": elementos_seleccionados,
            "total": len(elementos_seleccionados)
        }
            
    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }
