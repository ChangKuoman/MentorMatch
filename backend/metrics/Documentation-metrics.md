
# MENTOR MATCH REST API DOCUMENTATION

## Table of Contents

- [Introduction](#introduction)
- [Endpoints Metrics](#endpoints-metrics)
    - [/metric/chats](#metric-chats)
    - [/metric/matches](#metric-matches)
    - [/metric/register](#metric-register)

## Introduction

Headers: **Content-Type: application/json**

API link: https://fnac3oh84b.execute-api.us-east-1.amazonaws.com/prod

## Endpoints Metrics

### Metric Chats

Endpoint: **/metric/chats** <br>
HTTP Request: **GET** <br>
Lambda Function Associated: mentor-match-rest-metric-chats <br>
Description:
- Uses CloudWatch to return how many calls to function mentor-match-rest-put-chat in the last x hours.
- Default value is 120 hours (5 days)

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| hours | string | OPTIONAL |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| metric | int | |

Error Handling: 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Metric Matches

Endpoint: **/metric/matches** <br>
HTTP Request: **GET** <br>
Lambda Function Associated: mentor-match-rest-metric-event <br>
Description:
- Scans dynamodb table mentor-match-event and return amount of matches in the last x hours.
- Default value is 120 hours (5 days)

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| hours | string | OPTIONAL |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| metric | int | |

Error Handling: 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Metric Register

Endpoint: **/metric/register** <br>
HTTP Request: **GET** <br>
Lambda Function Associated: mentor-match-rest-metric-register <br>
Description:
- Uses CloudWatch to return how many calls to function mentor-match-register in the last x hours.
- Default value is 120 hours (5 days)

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| hours | string | OPTIONAL |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| metric | int | |

Error Handling: 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |