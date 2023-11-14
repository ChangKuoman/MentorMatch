import boto3


def lambda_handler(event, context):

    table_name = 'mentor-match-qualification'

    # Configurar el cliente de DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)

    response = table.scan()

    items = response.get('Items', [])
    result = [
        ['uuid', 'email', 'comment', 'date', 'qualification']
    ]
    for item in items:
        result.append([
            item["uuid"],  
            item["email"],
            item["comment"],
            item["date"],
            item["qualification"]
        ])

    return result
