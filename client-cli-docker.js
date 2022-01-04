const WebSocket = require('ws');
const readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

//callback for when text is entered and enter is pressed at cli
rl.on('line', data => {
    if (ws.readyState === ws.OPEN) {
        ws.send(data);
    } else {
        console.log("Connection not open yet, try again");
    }
});

// Setup websocket with callbacks.
// Open the connection with the server.
let ws = new WebSocket('ws://localhost:3123/');
// let ws = new WebSocket('ws://192.168.1.9:3123/'); //docker server ip address

process.on('SIGINT', () => {
    console.log("Rec'd CTRL-C, closing connection");
    ws.close(); //process term handled by ws.close
});
process.on('uncaughtException', function (e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});

console.log("End session with <CTRL>-C");
console.log("Enter 'math', 'hi', 'bye', 'goodbye, 'time");

// When a message from server is received, we display it on the screen.
ws.onmessage = function (evt) {
    var msgReceived = evt.data;
    console.log("Websocket server responds: " + msgReceived);
};

// As soon as the connection is closed, we inform the user.
ws.onclose = function () {
    console.log('Disconnected from server');
    process.exit(1);
};

// Log a message when connection is successful.
ws.onopen = function () {
    console.log(`Connected to server`);
};