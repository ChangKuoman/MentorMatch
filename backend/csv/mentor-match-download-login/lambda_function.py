import boto3
from datetime import datetime, timedelta
import time

def lambda_handler(event, context):
    client = boto3.client('logs')
    
    query = "fields @timestamp, @message | filter @message like 'INF' | sort @timestamp desc"
    
    log_group = '/aws/lambda/mentor-match-rest-login'
    
    start_query_response = client.start_query(
        logGroupName=log_group,
        startTime=int((datetime.today() - timedelta(hours=1440)).timestamp()),
        endTime=int(datetime.now().timestamp()),
        queryString=query,
    )
    
    query_id = start_query_response['queryId']
    
    response = None
    
    while response == None or response['status'] == 'Running':
        time.sleep(1)
        response = client.get_query_results(
            queryId=query_id
        )
        
    result = [
        ["timestamp", "email"]    
    ]
    for query in response["results"]:
        result.append([
            query[0]["value"],
            query[1]["value"].rstrip().split(',')[1]
            ])

    return result