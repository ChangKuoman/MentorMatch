
# MENTOR MATCH WEBSOCKET API DOCUMENTATION

## Table of Contents

- [Introduction](#introduction)
- [Routes](#routes)
    - [$connect](#connect)
    - [$disconnect](#disconnect)
    - [setEmail](#set-email)
    - [sendMessage](#send-message)

## Introduction
WebSocket URL: wss://5rae21tjti.execute-api.us-east-1.amazonaws.com/test/
URL de @connections: https://5rae21tjti.execute-api.us-east-1.amazonaws.com/test/@connections

## Routes

### Connect

Lambda Function Associated: mentor-match-websocket-connection <br>
Description:
- Connects to websocket
- Save connection id in dynamodb table (websocket-connections)

Body: Not Required

### Disconnect

Lambda Function Associated: mentor-match-websocket-disconnect <br>
Description:
- Disconnects from websocket
- Deletes connection id in dynamodb table (websocket-connections)

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
    "to":"example@utec.edu.pe",
    "fr":"example@gmail.com",
    "uuid": "c5536400-cc80-43b0-b2ab-7590c354ab09"
}
