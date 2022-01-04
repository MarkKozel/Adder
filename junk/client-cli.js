var WebSocket = require('ws');
const readline = require('readline-sync');

// Function that helps us log message to the screen.
function log(msg) {
    console.log(msg);
}

// Setup websocket with callbacks.
// Open the connection with the server.
// var ws = new WebSocket('ws://localhost:3123/');
var ws = new WebSocket('ws://localhost:3123/');
//192.168.1.9s.on('SIGINT', () => {
console.log("Rec'd CTRL-C, closing connection");
ws.close();
// });

console.log("End session with <CTRL>-C");

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (ws.readyState === ws.OPEN) {
        ws.send(chunk);
    } else {
        console.log("Connection not open yet, try again");
    }
});

// When a message from server is received, we display it on the screen.
ws.onmessage = function (evt) {
    var msgReceived = evt.data;
    log("Websocket server responds: " + msgReceived);
};

// As soon as the connection is closed, we inform the user.
ws.onclose = function () {
    log('Disconnected from server');
    process.exit(1);
};

// Log a message when connection is successful.
ws.onopen = function () {
    log(`Connected to server with ${ws.protocol} connection`);
};