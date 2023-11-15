import boto3
import uuid
import datetime


def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str
    

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
        map = check_attributes(event, ["uuid", "new_state"])
        if map["ok"] == False:
            error = ",".join(map["needed"])
            error += " attributes are needed in payload"
            return {
                "status": 400,
                "text": "Bad Request",
                "error": error
            }
            

        # OBTAIN ATTRIBUTES OF EVENT
        uuidv4 = event["uuid"]
        new_state = event["new_state"]
        
        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_event = dynamodb.Table('mentor-match-event')
        
        # VERIFIES IF EVENT EXISTS
        response = table_event.get_item(Key={'uuid': uuidv4})
        if 'Item' not in response:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid event"
            }
        
        # UPDATE EVENT
        response["Item"]["state"] = new_state
        response_put = table_event.put_item(Item=response["Item"])
        print(f"INF,{uuidv4},{new_state},{response['Item']['email_giver']},{response['Item']['email_receiver']}")
        if (new_state == 1):
            email1 = response["Item"]["email_giver"]
            email2 = response["Item"]["email_receiver"]
            emails_l = sorted([email1, email2])
            emails_s = "/".join(emails_l)
            
            table_chat = dynamodb.Table('mentor-match-chat')
            response2 = table_chat.query(
                IndexName='emails-index',
                KeyConditionExpression="emails = :partitionkeyval",
                ExpressionAttributeValues={
                    ':partitionkeyval': emails_s
                }
            )
            if len(response2["Items"]) == 0:
                # CREATE A NEW CHAT
                uuidv4 = str(uuid.uuid4())
                uuidmssg = str(uuid.uuid4())
                item = {
                    "uuid": uuidv4,
                    "emails": emails_s,
                    "messages": [
                        {
                            "content": "¡Increíble, acaban de hacer match por primera vez!",
                            "date": timestamp_to_str(datetime.datetime.now()),
                            "user": "system",
                            "uuid": uuidmssg
                        }
                    ]
                }
                response3 = table_chat.put_item(Item=item)
                # ADD TO USERS
                table_user_data = dynamodb.Table('mentor-match-user-data')
                
                response_u1 = table_user_data.get_item(Key={'email': email1})
                response_u2 = table_user_data.get_item(Key={'email': email2})
        
                response_u1["Item"]["chats"].append(uuidv4)
                response_u2["Item"]["chats"].append(uuidv4)
                
                table_user_data.put_item(Item=response_u1["Item"])
                table_user_data.put_item(Item=response_u2["Item"])
                
                return {
                    "status": 200,
                    "text": "Ok",
                    "events": [response["Item"]],
                    "total": 1,
                    "chats": [item]
                }
                
            elif len(response2["Items"]) == 1:
                uuidmssg = str(uuid.uuid4())
                response2["Items"][0]["messages"].append({
                    "content": "¡Increíble, hicieron match otra vez!",
                    "date": timestamp_to_str(datetime.datetime.now()),
                    "user": "system",
                    "uuid": uuidmssg
                })
                response3 = table_chat.put_item(Item=response2["Items"][0])
                return {
                    "status": 200,
                    "text": "Ok",
                    "events": [response["Item"]],
                    "total": 1,
                    "chats": [response2["Items"][0]]
                }

        return {
            "status": 200,
            "text": "Ok",
            "events": [response["Item"]],
            "total": 1
        }

    except Exception as e:
        return {
            "error": str(e),
            "status": 500,
            "text": "Internal Server Error"
        }


