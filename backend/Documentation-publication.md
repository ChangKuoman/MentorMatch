# Mentor Match API Documentation

Payload and response are in JSON Objects.

API link: https://fjmjpibq48.execute-api.us-east-1.amazonaws.com/test

---

Endpoint: **/publication** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-publication-post <br>
Description:
- Creates publication in dynamodb table (mentor-match-publication)
- If there is already a publication, updates active and date

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| email | string | |
| course | string | |
| description | string | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| publication | map | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/publications** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-publications-get <br>
Description:
- Scans all dynamodb table mentor-match-publication
- If course is in payload, returns their associate registers

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| course | string | OPTIONAL |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| total | int | |
| data | list | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/publication** <br>
HTTP Request: **DELETE** <br>
Lambda Function Associated: mentor-match-publication-delete <br>
Description:
- Updates active to false
- Updates date

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| email | string | |
| course | string | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| publication | list | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |
