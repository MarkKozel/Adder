var WebSocketServer = require('ws').Server

let a, b = null;
let sumFlag = false;
// Create an instance of websocket server.
var wss = new WebSocketServer({ host: '127.0.0.1', port: 3123 });

console.log('New server created, waiting for connections...');
// Add the connection listener that will be triggered once the connection is established.
wss.on('connection', function(ws) {
    console.log('Server was connected.');
    //  Add the listener for that particular websocket connection instance.
    ws.on('message', function(message) {
        console.log('Server received message: %s', message);
        // Send back the message that we receive from the browser

        if (message === 'sum') {
            sumFlag = true;
            a = null;
            b = null;
            message = "starting sum";
        } else {
            if ((sumFlag = true) && (a === null) && (b === null)) {
                a = message;
                message = "Rec'd a";
            } else {
                if ((sumFlag = true) && (a !== null) && (b === null)) {
                    b = message;
                    message = "Rec'd b";
                    result = sum(a, b);
                    message = "Sum of " + a + " and " + b + " = " + result;
                }
            }

        }


        ws.send(message);
    });
});

sum = function(a, b) {
    result = Number(a) + Number(b);
    a = null;
    b = null;
    sumFlag = false;

    return result;
}