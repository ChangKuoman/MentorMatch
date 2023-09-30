import boto3
import uuid
import datetime

def timestamp_to_str(timestamp):
    """Convierte un timestamp en formato datetime a una cadena."""
    timestamp_str = timestamp.strftime('%Y-%m-%d %H:%M:%S')
    return timestamp_str

# CREAR EVENTO
def lambda_handler(event, context):
    try:
        # Obtenemos los atributos de event
        email_receiver = event["email_receiver"]
        
        email_giver = event["email_giver"]
        course = event["course"]

        # conexión con dynamodb
        dynamodb = boto3.resource('dynamodb')
        table_user = dynamodb.Table('mentor-match-data')

        uuidv4 = str(uuid.uuid4())
        # creamos items
        item_event = {
            "uuid": uuidv4,
            "email_giver": email_giver,
            "email_receiver": email_receiver,
            "state": 0,
            "course": course,
            "date": timestamp_to_str(datetime.datetime.now()),
            "content": {},
        }

        # hallar emails
        response_giver = table_user.get_item(Key={'email': email_giver})
        response_receiver = table_user.get_item(Key={'email': email_receiver})

        response_giver["Item"]["content"]["events-g"].append(uuidv4)
        response_receiver["Item"]["content"]["events-r"].append(uuidv4)

        client = boto3.client('dynamodb')
    
        # se asumirá que las transacciones se harán bien
        table_user.put_item(Item=response_giver["Item"])
        table_user.put_item(Item=response_receiver["Item"])
        table_event = dynamodb.Table('mentor-match-event')
        table_event.put_item(Item=item_event)

        return {
            "status": 200,
            "text": "Ok",
            "events": [item_event]
        }

    except:
        return {
            "status": 500,
            "text": "Internal Server Error"
        }


