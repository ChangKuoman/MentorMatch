import boto3


def lambda_handler(event, context):

    table_name = 'mentor-match-event'

    # Configurar el cliente de DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)

    response = table.scan()

    items = response.get('Items', [])
    result = [
        ['uuid', 'creationDate', 'email_giver', 'email_receiver', 'qualified', 'state', 'tag']
    ]
    for item in items:
        result.append([
            item["uuid"],  
            item["date"],
            item["email_giver"],
            item["email_receiver"],
            item["qualified"],
            item["state"],
            item["tag"]
        ])

    return result
