# Mentor Match API Documentation

Payload and response are in JSON Objects.

API link: https://fjmjpibq48.execute-api.us-east-1.amazonaws.com/test

---

Endpoint: **/event** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-event-post <br>
Description:
- Creates event in dynamodb table (mentor-match-event)
- uuid is saved in mentor-match-data for both giver and receiver

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| email_receiver | string | |
| email_giver | string | |
| course | string | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| events | list | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/events** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-event-get <br>
Description:
- If uuid in payload, returns the associate event
- If email is in payload, returns the associate events
- If email AND course in payload, returns the associate events

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| uuid | string | OPTIONAL |
| email | string | OPTIONAL |
| course | string | OPTIONAL |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| total | int | |
| events | list | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/event** <br>
HTTP Request: **PUT** <br>
Lambda Function Associated: mentor-match-event-put <br>
Description:
- Updates state from register to new_state

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| uuid | string | |
| new_state | int | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| event | list | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |
