# Dahu-pusher

## Requirements
* Node.js
* Yarn

### Installation
```sh
yarn install
``` 

### Run
```sh
node main.js
```

## Protocol
Socket.io emits events when the notify route is hit, it emits an event based on the type the route notify is set and then sends the id of the service it is notifying.

| Service   | Event Type | Passed element  |
|:----------|:----------:|:----------------|
| Chat      | chat       | project uuid    |
| JSONDebug | data       | `{ ... }`       |
| Message   | msg        | random string   |

For debug purposes, one can send "msg" events for the sake of transmiting strings or stringified json on "data" events. Stringified json must follow this pattern: 

```json
{
    "type": "chat",
    "message": "project_uuid"
}
```
*Example of "data" type event designed to rebroadcast "chat" event type with "project_uuid" as content.*

It will then be retransmitted on the selected **type** event with the content of the **message** value. 

Additionally, if the debug mode is activated in the `config.json` file, any developper can navigate to the `/debug` route and access the debugging console which allow developpers to create and send customized or preconfigured events into the notification process.

## How to connect to Pusher
Simply connect the way you would using any Socket.io server and listen for specified events types according to the service you want to be notified about.

```js
socket.on('chat', msg => {
    let li = document.createElement('li');
    li.innerHTML = msg;
    li.className += 'chat';
    document.getElementById('messages').appendChild(li);
});
```
*Example of a client listening to "chat" events and adding the associated project uuid as a li element in the html.*

## Generate docs
```sh
apidoc -i . -f "main.js" -o docs
```