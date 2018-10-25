let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const config = require('./config.json');
let debugSockets = [];

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
    res.json({debugClients: debugSockets.length});
});

/**
 * @api {post} /notify/:type/:id Notify
 * @apiDescription Sends a notification to connected users
 * @apiName Notify
 * @apiGroup General
 * 
 * @apiParam {string="chat"} type Which service to notify
 * @apiParam {string} id UUID or ID of concerned service
 */
app.post('/notify/:type/:id', function(req, res) {
    let type = req.params.type;
    let target = req.params.id;
    res.setHeader('Content-Type', 'application/json');
    if (!config.messages.types.includes(type)) {
        res.status(400);
        res.json({error : `unknown type: ${type}`});
        return false;
    }

    io.emit(type, target);
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

    socket.on('debug', msg => {
        debugSockets.push(socket);
    });

    socket.on('disconnect', () => {
        console.log('Somebody disconnected.');
        debugSockets = debugSockets.filter(s => s === socket);
    });

    socket.on('msg', msg => {
        console.log('msg:', msg);
        io.emit('inbound', msg);
    });

    socket.on('data', msg => {
        let data = {};
        try {
            data = JSON.parse(msg);
        } catch (e) {
            console.log('Bad JSON');
            return false;
        }

        console.log('data:', data);
        io.emit(data.type, data.message);
    })
});

/**
 * Initialization
 */
http.listen(config.port, () => {
    console.log(`Listening on *:${config.port}`);
});