// var WebSocket = require('ws');
// const readline = require('readline-sync');

// Function that helps us log message to the screen.
function log(msg) {
    document.getElementById('log').innerText += msg + '\n';
    console.log(msg);
}

// Setup websocket with callbacks.
// Open the connection with the server.
var ws = new WebSocket('ws://192.168.99.100:3123/');

// Log a message when connection is successful.
ws.onopen = function() {
    log('Connected to server');
};

// Waiting for user input.
document.getElementById('send').onclick = function() {
    var msgSend = document.getElementById('entry').value;
    log("Browser sends: " + msgSend);
    //Once user's input is received, we send it to the server.
    ws.send(msgSend);
}

// When a message from server is received, we display it on the screen.
ws.onmessage = function(evt) {
    var msgReceived = evt.data;
    log("Websocket server responds: " + msgReceived);
}

// As soon as the connection is closed, we inform the user.
ws.onclose = function() {
    log('Disconnected from server');
};