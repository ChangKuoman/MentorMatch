import boto3
from datetime import datetime, timedelta

def lambda_handler(event, context):
    try:
        dynamodb = boto3.resource('dynamodb')
        table_name = 'mentor-match-event'
    
        hours = int(event['hours']) if 'hours' in event else 120
    
        end_time = datetime.now()
        start_time = end_time - timedelta(hours=hours)
    
        # Format dates
        end_time_str = end_time.strftime('%Y-%m-%d %H:%M:%S')
        start_time_str = start_time.strftime('%Y-%m-%d %H:%M:%S')
    
        table = dynamodb.Table(table_name)
        response = table.scan()
        items = response['Items']
        count = 0

        for item in items:
            if start_time_str <= item['date'] <= end_time_str and item['state'] in [2, 1]:
                count += 1
    
        return {
            "status": 200,
            "text": "Ok",
            "metric": count
        }
    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": e
        }

