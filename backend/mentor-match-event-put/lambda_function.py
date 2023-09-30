import boto3

# PUT EVENT
def lambda_handler(event, context):
    try:
        # Connection to dynamodb
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('mentor-match-event')
        
        # Obtain values from event
        uuidv4 = event["uuid"]
        new_state = event["new_state"]
        
        # Obtain the event from the uuid
        response = table.get_item(Key={'uuid': uuidv4})
        
        response["Item"]["state"] = new_state
        
        response2 = table.put_item(Item=response["Item"])

        return {
            "status": 200,
            "text": "Ok",
            "events": [response["Item"]]
        }

    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }


