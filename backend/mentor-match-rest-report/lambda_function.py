iimport datetime
import uuid
import boto3


def timestamp_to_str(timestamp):
    """Convert a timestamp in datetime format to a string."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str
    
    
def lambda_handler(event, context):

    # OBTAIN ATTRIBUTES OF EVENT
    email = event["email"]
    email_report = event["email_report"]
    date = timestamp_to_str(datetime.datetime.now())
    uuidv4 = str(uuid.uuid4())
    
    # DYNAMODB CONNECTION
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('mentor-match-report')
    
    item = {
        "email": email,
        "email_report": email_report,
        "date": date,
        "uuid": uuidv4 
    }

    response = table.put_item(Item=item)

    return {
        "status": 200,
        "text": "Ok"
    }
