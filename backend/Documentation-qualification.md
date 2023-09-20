# Mentor Match API Documentation - Qualifications

Payload and response are in JSON Objects.

API link: https://fjmjpibq48.execute-api.us-east-1.amazonaws.com/test

---

Endpoint: **/qualification** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-qualification-post <br>
Description:
- Verifies email exists in mentor-match-user
- Verifies number is in range [0-5]
- Creates uuid4
- Insert data in dynamodb table (mentor-match-qualification)

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| email | string | |
| number | int | [0-5] |
| comment | string | OPTIONAL |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 403 |
| text | string | "Forbidden" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/qualification** <br>
HTTP Request: **GET** <br>
Lambda Function Associated: mentor-match-qualification-get <br>
Description:
- Scans all dynamodb table mentor-match-qualification
- Calculates the mean of qualifications

Payload: No payload required

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| total | float | [0:5] |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |
