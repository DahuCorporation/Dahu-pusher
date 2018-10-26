# Dahu-pusher

## Run
```sh
node main.js
```
Works with Socket.io.

## Protocol
Socket.io emits events when the notify route is hit, it emits an event based on the type the route notify is set and then sends the id of the service it is notifying.

| Service | Event Type | Passed Id |
|:--------|:----------:|:----------|
| Chat    | chat       | project uuid |

For debug purposes, one can send "msg" events for the sake of transmiting strings or stringified json on "data" events. Stringified json must follow this pattern: 

```json
{
    "type": "chat",
    "message": "project_uuid"
}
```
*Example of "data" type event designed to rebroadcast "chat" event type with "project_uuid" as content.*

It will then be retransmitted on the selected **type** event with the content of the **message** value.

## How to connect to Pusher
Simply connect the way you would using any Socket.io server and listen for specified events types according to the service you want to be notified about.

## Generate docs
```sh
apidoc -i . -f "main.js" -o docs
```