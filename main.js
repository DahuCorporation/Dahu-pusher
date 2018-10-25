let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const config = require('./config.json');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/resources/index.html');
});

app.get('/status', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({ok: true});
});

if (config.debugmode) {
    app.get('/debug', function(req, res) {
        res.sendFile(__dirname + '/resources/debug.html');
    })
}

io.on('connection', socket => {
    console.log('Somebody connected');

    socket.on('disconnect', () => {
        console.log('Somebody disconnected.');
    });

    socket.on('chat message', msg => {
        console.log('msg:', msg);
        io.emit('inbound', msg);
    });
});

http.listen(7000, () => {
    console.log('Listening on *:7000');
});