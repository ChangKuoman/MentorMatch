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
        map = check_attributes(event, ["email", "qualification", "event"])
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
        uuid = event["event"]

        # DYNAMODB CONNECTION
        dynamodb = boto3.resource('dynamodb')
        table_user_data = dynamodb.Table('mentor-match-user-data')
        table_event = dynamodb.Table('mentor-match-event')

        # VERIFIES IF EMAIL EXISTS
        response = table_user_data.get_item(Key={'email': email})
        if 'Item' not in response:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid email"
            }
        # VERIFIES IF EVENT EXISTS
        response_event = table_event.get_item(Key={'uuid': uuid})
        if 'Item' not in response_event:
            return {
                "status": 404,
                "text": "Not Found",
                "error": "Invalid event"
            }

        # UPDATES QUALIFICATION
        item = response["Item"]
        item["qualification"][0] += 1
        item["qualification"][1] += qualification
        response = table_user_data.put_item(Item=item)
        # UPDATES EVENT
        response_event["Item"]["qualified"] = True
        response = table_event.put_item(Item=response_event["Item"])

        return {
            "status": 200,
            "text": "Ok",
            "event": [response_event["Item"]],
            "users": [item],
            "total": 1
        }

    except Exception as e:
        return {
            "error": str(e),
            "status": 500,
            "text": "Internal Server Error"
        }