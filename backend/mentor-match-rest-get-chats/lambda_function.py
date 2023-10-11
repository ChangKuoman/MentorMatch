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
        map = check_attributes(event, ["chats"])
        if map["ok"] == False:
            error = ",".join(map["needed"])
            error += " attributes are needed in payload"
            return {
                "status": 400,
                "text": "Bad Request",
                "error": error
            }
            
        # OBTAIN ATTRIBUTES OF EVENT
        chat_uuids = event["chats"]
            
        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_chat = dynamodb.Table('mentor-match-chat')
            
        total = 0
        events = []

        for uuid in chat_uuids:            
            response = table_chat.get_item(Key={'uuid': uuid})
            if "Item" in response:
                total += 1
                events.append(response["Item"])
                
        return {
            "status": 200,
            "text": "Ok",
            "total": total,
            "chats": events
        }

    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": str(e)
        }