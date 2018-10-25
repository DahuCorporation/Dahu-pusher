let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const config = require('./config.json');

/**
 * Routes
 */

/**
 * @api {get} / Root
 * @apiDescription Test if pusher is running
 * @apiName Test
 * @apiGroup General
 * 
 */
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/resources/index.html');
});

/**
 * @api {get} /status Status
 * @apiDescription Returns informations about the pusher
 * @apiName Status
 * @apiGroup General
 */
app.get('/status', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({ok: true});
});

if (config.debugmode) {
    /**
     * @api {get} /debug DebugConsole
     * @apiDescription Shows debug console which can be used to manually trigger events
     * @apiName DebugConsole
     * @apiGroup Debug
     */
    app.get('/debug', function(req, res) {
        res.sendFile(__dirname + '/resources/debug.html');
    })
}

/**
 * Sockets
 */

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

/**
 * Initialization
 */
http.listen(config.port, () => {
    console.log(`Listening on *:${config.port}`);
});