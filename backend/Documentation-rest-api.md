
# MENTOR MATCH REST API DOCUMENTATION

## Table of Contents

- [Introduction](#introduction)
- [Endpoints User](#endpoints-user)
    - [/register](#register)
    - [/login](#login)
    - [/change-password](#change-password)
    - [/delete-user](#delete-user)
    - [/get-users](#get-users)
    - [/user-description](#user-description)
    - [/user-pfp](#user-pfp)
    - [/user-qualify](#user-qualify)
    - [/user-tags](#user-tags-post)
    - [/user-tags](#user-tags-delete)
    - [/get-matching-users](#get-matching-users)

- [Endpoints Qualification](#endpoints-user)
    - [/qualification](#qualification-post)
    - [/qualification](#qualification-get)

- [Endpoints Event](#endpoints-user)
    - [/new-event](#new-event)
    - [/event-state](#event-state)
    - [/get-events](#get-events)

- [Endpoints Chat](#endpoints-user)
    - [/get-chats](#get-chats)
    - [/put-chat](#put-chat)

## Introduction

Headers: **Content-Type: application/json**

API link: https://fnac3oh84b.execute-api.us-east-1.amazonaws.com/prod

## Endpoints User

### Register

Endpoint: **/register** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-register <br>
Description:
- Checks attributes are in event
- Verifies partition key (email) is not repeated
- Verifies (documentType, documentNro) is not repeated
- Hashes password using sha256
- Insert data in 2 dynamodb tables (mentor-match-user and mentor-match-user-data)

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| name | string | |
| surname | string | |
| documentType | string | "DNI", "CE" |
| documentNro | string | |
| password | string | |
| birthDate | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| users | list | |
| total | int | |

Error Handling: 400, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Login

Endpoint: **/login** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-login <br>
Description:
- Checks attributes are in event
- Verifies email exists
- Verifies email and password matches
- Blocks account if maximum number of attempts **(3)** is reached.

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| password | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| users | list | |
| total | int | |

Error Handling: 400, 401, 404, 429, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |
| attemps (401) | int | 1, 2, 3 |
| unlockDate (429) | string | %Y-%m-%d %H:%M:%S |

### Change Password

Endpoint: **/change-password** <br>
HTTP Request: **PUT** <br>
Lambda Function Associated: mentor-match-rest-change-password <br>
Description:
- Checks attributes are in event
- Verifies email exists
- Verifies email and password matches
- Hashes new password and updtes in dynamodb table mentor-match-user

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| old_password | string | |
| new_password | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |

Error Handling: 400, 401, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Delete User

Endpoint: **/delete-user** <br>
HTTP Request: **DELETE** <br>
Lambda Function Associated: mentor-match-rest-delete-user <br>
Description:
- Checks attributes are in event
- Verifies email exists
- Verifies email and password matches
- Delete registers in dynamodb tables (mentor-match-user and mentor-match-user-data)

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| password | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |

Error Handling: 400, 401, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Get Users

Endpoint: **/get-users** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-get-users <br>
Description:
- Checks attribute is in event
- Returns associated registers is list of emails
- If list of emails is empty, scans all dynamodb table mentor-match-user-data

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| emails | list | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| total | int | |
| users | list | |

Error Handling: 400, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### User Description

Endpoint: **/user-description** <br>
HTTP Request: **PUT** <br>
Lambda Function Associated: mentor-match-rest-user-description <br>
Description:
- Checks attributes are in event
- Checks email exists
- Updates description of associated user

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| description | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| users | list | |
| total | int | |

Error Handling: 400, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### User PFP

Endpoint: **/user-pfp** <br>
HTTP Request: **PUT** <br>
Lambda Function Associated: mentor-match-rest-user-pfp <br>
Description:
- Checks attributes are in event
- Checks email exists
- Updates description of associated user

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| profile_picture | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| users | list | |
| total | int | |

Error Handling: 400, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### User Qualify

Endpoint: **/user-qualify** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-user-qualify <br>
Description:
- Checks attributes are in event
- Checks email exists
- Updates qualification of associated user

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| qualification | number | |
| event | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| users | list | |
| event | list | |
| total | int | |

Error Handling: 400, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### User Tags POST

Endpoint: **/user-tags** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-user-tags-post <br>
Description:
- Checks attributes are in event
- Checks email exists
- Updates tags with list of new tags

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| tags | list | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| users | list | |
| total | int | |

Error Handling: 400, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### User Tags DELETE

Endpoint: **/user-tags** <br>
HTTP Request: **DELETE** <br>
Lambda Function Associated: mentor-match-rest-user-tags-delete <br>
Description:
- Checks attributes are in event
- Checks email exists
- Deletes tags with list of tags

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| tags | list | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| users | list | |
| total | int | |

Error Handling: 400, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Get Matching Users

Endpoint: **/get-matching-users** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-get-matching-users <br>
Description:
- Checks attribute is in event
- Verifies email exists
- Returns all matching users for specified user

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| users | list | |
| total | int | |

Error Handling: 400, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

## Endpoints Qualification

### Qualification POST

Endpoint: **/qualification** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-qualification-post <br>
Description:
- Checks attributes are in event
- Verifies email exists
- Verifies number is in range [0-5]
- Creates uuid4
- Insert data in dynamodb table (mentor-match-qualification)

Payload:

| Key | Value | Restrictions |
| -- | -- | -- |
| email | string | |
| qualification | int | [0-5] |
| comment | string | OPTIONAL |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |

Error Handling: 400, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Qualification GET

Endpoint: **/qualification** <br>
HTTP Request: **GET** <br>
Lambda Function Associated: mentor-match-rest-qualification-get <br>
Description:
- Scans all dynamodb table mentor-match-qualification
- Calculates the mean of qualifications
- If there are 0 qualifications, returns total of -1

Payload: No payload required

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| total | float | [0:5] (-1) |

Error Handling: 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

## Endpoints Event

### New Event

Endpoint: **/new-event** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-new-event <br>
Description:
- Checks attributes are in event
- Verifies emails exists
- Creates event in dynamodb table (mentor-match-event)
- uuid is saved in mentor-match-data for both giver and receiver

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email_receiver | string | |
| email_giver | string | |
| tag | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| events | list | |
| total | int | |

Error Handling: 400, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Event State

Endpoint: **/event-state** <br>
HTTP Request: **PUT** <br>
Lambda Function Associated: mentor-match-rest-event-state <br>
Description:
- Checks attributes are in event
- Updates state from register to new_state

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| uuid | string | |
| new_state | int | 0, 1, 2, 3 |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| events | list | |
| total | int | |
| chats (1) | list | |

Error Handling: 400, 404, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Get Events

Endpoint: **/get-events** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-get-events <br>
Description:
- Checks attributes are in event
- Returns associated registers is list of events (uuids)

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| events | list | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| total | int | |
| events | list | |

Error Handling: 400, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

## Endpoints Chat

### Get Chats

Endpoint: **/get-chats** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-get-chats <br>
Description:
- Checks attributes are in event
- Returns associated registers is list of chats (uuids)

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| chats | list | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| total | int | |
| chats | list | |

Error Handling: 400, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |

### Put Chat

Endpoint: **/put-chat** <br>
HTTP Request: **PUT** <br>
Lambda Function Associated: mentor-match-rest-put-chat <br>
Description:
- Checks attributes are in event
- Adds message to chat

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| chat | string | |
| message | string | |
| to | string | |
| fr | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
| total | int | |
| chats | list | |

Error Handling: 400, 500

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | |
| text | string | |
| error | string | |


### Report

Endpoint: **/report** <br>
HTTP Request: **POST** <br>
Lambda Function Associated: mentor-match-rest-report <br>
Description:
- Adds report to mentor-match-report table

Payload:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| email | string | |
| email_report | string | |

Response Examples:

| Key | Value | Restrictions |
| :-- | :-- | --: |
| status | int | 200 |
| text | string | "Ok" |
