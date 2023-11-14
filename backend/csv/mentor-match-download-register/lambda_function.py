import boto3


def lambda_handler(event, context):

    table_name = 'mentor-match-user'

    # Configurar el cliente de DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)

    response = table.scan()

    items = response.get('Items', [])
    result = [
        ['email', 'creationDate']
    ]
    for item in items:
        result.append([
            item["email"],  
            item["creationDate"]
        ])

    return result
