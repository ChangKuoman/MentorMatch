import boto3
from datetime import datetime, timedelta

def lambda_handler(event, context):
    try:
        cloudwatch = boto3.client('cloudwatch')
    
        function_name = 'mentor-match-rest-register'
    
        hours = int(event['hours']) if 'hours' in event else 120
    
        end_time = datetime.now()
        start_time = end_time - timedelta(hours=hours)
    
        # Format dates for Cloudwatch
        start_time_str = start_time.strftime('%Y-%m-%dT%H:%M:%SZ')
        end_time_str = end_time.strftime('%Y-%m-%dT%H:%M:%SZ')
    
        response = cloudwatch.get_metric_statistics(
            Namespace='AWS/Lambda',
            MetricName='Invocations',
            Dimensions=[
                {
                    'Name': 'FunctionName',
                    'Value': function_name
                },
            ],
            StartTime=start_time_str,
            EndTime=end_time_str,
            Period=3600,  # One hour in seconds
            Statistics=['Sum'],
            Unit='Count'
        )

        if len(response['Datapoints']) != 0:
            return {
                "status": 200,
                "text": "Ok",
                "metric": response['Datapoints'][0]['Sum']
            }
        else:
            return {
                "status": 200,
                "text": "Ok",
                "metric": 0
            }
    except Exception as e:
        return {
            "status": 500,
            "text": "Internal Server Error",
            "error": e
        }

# Ejemplo de invocación para probar la función con 72 horas como parámetro
# event = {'hours': '72'}
# print(lambda_handler(event, None))
