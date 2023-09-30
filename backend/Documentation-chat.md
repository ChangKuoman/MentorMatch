# Mentor Match API Documentation

Payload and response are in JSON Objects.

API link: https://fjmjpibq48.execute-api.us-east-1.amazonaws.com/test

---

Endpoint: **/chat** <br>
HTTP Request: **GET** <br>
Lambda Function Associated: mentor-match-chat-get <br>
Description:
- returns chat associated to uuid

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| uuid | string | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| chats | list | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/chat** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-chat-post <br>
Description:
- text is storaged in chat

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| uuid | string | |
| email | string | |
| text | string | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| chats | list | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |
