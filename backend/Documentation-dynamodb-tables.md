
# MENTOR MATCH DYNAMODB TABLES DOCUMENTATION

## Table of Contents

- [Table User](#table-user)
- [Table User Data](#table-user-data)
- [Table Qualification](#subsection-11)
- [Table Event](#subsection-12)
- [Table Chat](#section-2)
- [Table Websocket-Connection](#conclusion)

## Table User

Table Name: **mentor-match-user**

| Field | Type | Description |
|:---|:---|---:|
| email | string | Partition Key |
| attempts | int | 0 <= n <= 3 |
| blockDate | string | date |
| unlockDate | string | date |
| document | list | [documentType: string, documentNro: string] |
| password | string | hashed password |
| connectionId | string | |

## Table User Data

Table Name: **mentor-match-user-data**

| Field | Type | Description |
|:---|:---|---:|
| email | string | Partition Key |
| name | string | |
| surname | string | |
| birthDate | string | date |
| description | string | |
| verified | bool | |
| qualification | list | [int, int] |
| chats | list | contais strings |
| tags | list | contais strings |
| photo | string | |
| events-r | list | contais strings |
| events-g | list | contais strings |

## Table Qualification

Table Name: **mentor-match-qualification**

| Field | Type | Description |
|:---|:---|---:|
| uuid | string | Partition Key |
| email | string | Sort Key |
| number | number | 0 <= n <= 5 |
| date | string | date |
| description | string | |

## Table Event

Table Name: **mentor-match-event**

| Field | Type | Description |
|:---|:---|---:|
| uuid | string | Partition Key |
| date | string | date |
| email-r | string | |
| email-g | string | |
| state | number | 0 = Waiting, 1 = Accepted, 2 = Completed, 3 = Rejected |
| tag | string | |
| qualified | bool | |

## Table Chat

Table Name: **mentor-match-chat**

| Field | Type | Description |
|:---|:---|---:|
| uuid | string | Partition Key |
| emails | list | [string, string] |
| messages | list | contains maps: {date: string, user: string, content: string} |

Index: emails-index

## Table Websocket-Connection

Table Name: **mentor-match-websocket-connection**

| Field | Type | Description |
|:---|:---|---:|
| connectionId | string | Partition Key |
