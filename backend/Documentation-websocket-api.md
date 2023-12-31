
# MENTOR MATCH WEBSOCKET API DOCUMENTATION

## Table of Contents

- [Introduction](#introduction)
- [Routes](#routes)
    - [$connect](#connect)
    - [$disconnect](#disconnect)
    - [setEmail](#set-email)
    - [sendMessage](#send-message)

## Introduction
WebSocket URL: wss://ohkhi5gvc3.execute-api.us-east-1.amazonaws.com/test/
URL de @connections: https://ohkhi5gvc3.execute-api.us-east-1.amazonaws.com/test/@connections

## Routes

### Connect

Lambda Function Associated: mentor-match-websocket-connection <br>
Description:
- Connects to websocket
- Save connection id in dynamodb table (mentor-match-websocket-connection)

Body: Not Required

### Disconnect

Lambda Function Associated: mentor-match-websocket-disconnect <br>
Description:
- Disconnects from websocket
- Deletes connection id in dynamodb table (mentor-match-websocket-connection)

Body: Not Required

### Set Email

Lambda Function Associated: mentor-match-websocket-setEmail <br>
Description:
- Saves connection id to associated email in dynamodb table (mentor-match-user)

Body Example:
{
    "action":"setEmail",
    "email":"example@utec.edu.pe"
}

### Send Message

Lambda Function Associated: mentor-match-websocket-sendMessage <br>
Description:
- Saves message in dynamodb table (mentor-match-chat)
- Sends message if user is connected

Body Example:
{
    "action":"sendMessage",
    "message":"This is an example message!",
    "to":"example1@utec.edu.pe",
    "fr":"example2@utec.edu.pe",
    "uuid": "c5536400-cc80-43b0-b2ab-7590c354ab09"
}
