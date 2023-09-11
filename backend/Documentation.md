# Mentor Match API Documentation

Payload and response are in JSON Objects.

API link: https://fjmjpibq48.execute-api.us-east-1.amazonaws.com/test

---

Endpoint: **/register** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-create-new-user <br>
Description:
- Verifies partition key (email) is not repeated
- Verifies (typeDocument, nroDocument) is not repeated
- Hashes password using sha256
- Insert data in 2 dynamodb tables (mentor-match-user and mentor-match-data) using transactions

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| name | string | |
| email | string | |
| password | string | |
| typeDocument | string | "DNI", "CE" |
| nroDocument | int | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |
| email_exists | boolean | |
| document_exists | boolean | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| email | string | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/users** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-get-all-users <br>
Description:
- Scans all dynamodb table mentor-match-data
- If email is in payload, returns it's register

Payload:

| Key | Value | Restrictions |
| -- | -- | |
| email | string | OPTIONAL |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |

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

Endpoint: **/login** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-login <br>
Description:
- Verifies email and password matches
- Blocks account if maximum number of attempts **(3)** is reached.

Payload:

| Key | Value | Restrictions |
| -- | -- | |
| email | string | |
| password | string | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |
| error | string | "Invalid email" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |
| error | string | "Password incorrect" |
| attemps | int | 1, 2, 3 |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |
| error | string | "Too many attemps" |
| unlockDate | string | %Y-%m-%d %H:%M:%S |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| email | string | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/users** <br>
HTTP Request: **DELETE** <br>
Lambda Function Associated: mentor-match-delete <br>
Description:
- Verifies email and password matches
- Delete register in both dynamodb tables (mentor-match-user and mentor-match-data) using transactions

Payload:

| Key | Value | Restrictions |
| -- | -- | |
| email | string | |
| password | string | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |
| error | string | "Wrong password" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| email | string | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/change-password** <br>
HTTP Request: **PUT** <br>
Lambda Function Associated: mentor-match-password-change <br>
Description:
- Verifies email and password matches
- Updates password in dynamodb table mentor-match-user

Payload:

| Key | Value | Restrictions |
| -- | -- | |
| email | string | |
| password | string | |
| new_password | string | |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |
| error | string | "Wrong password" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| email | string | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |

---

Endpoint: **/users** <br>
HTTP Request: **PUT** <br>
Lambda Function Associated: mentor-match-edit <br>
Description:
- Verifies email exists
- Updates name if changed
- Updates all the content udpdated

Payload:

| Key | Value | Restrictions |
| -- | -- | |
| email | string | |
| name | string | "" |
| content | map | {} |

Response Examples:

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |
| error | string | "Wrong password" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 400 |
| text | string | "Bad Request" |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 200 |
| text | string | "Ok" |
| email | string | |

| Key | Value | Restrictions |
| -- | -- | -- |
| status | int | 500 |
| text | string | "Internal Server Error" |
