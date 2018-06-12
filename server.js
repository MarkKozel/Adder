var WebSocketServer = require('ws').Server

// Create an instance of websocket server.
var wss = new WebSocketServer({ port: 3123 });

let getTime = function() {
    var now = new Date();
    return now;
}

//Containers for math functions
let currentAddStep = 0; //1=start, 2=got op, 3=1st num, 4=2nd num
let currentOp = ''; //+,-,*,/
let firstVal = 0; //first number for operation
let secondVal = 0; //second number for operation
let math = function(input) {
    if (input === 'stop') { //Exit in the middle
        //reset all containers
        currentAddStep = 0;
        currentOp = '';
        firstVal = 0;
        secondVal = 0;
        return 'math action stopped';
    }

    if (currentAddStep === 0) { //start a math routine...request the operator
        currentAddStep++;
        return "enter operator (+,-,*,/) or 'stop' to exit math routine";
    }

    if (currentAddStep === 1) { //got operator...request first number
        currentAddStep++;
        currentOp = input
        return 'Enter first number'
    }

    if (currentAddStep === 2) { //got first number...request second number
        currentAddStep++;
        firstVal = input
        return 'Enter second number'
    }

    if (currentAddStep === 3) { //got second number...do the math
        var result = 0;
        secondVal = input;

        if (currentOp === '+') {
            result = Number(firstVal) + Number(secondVal);
        }
        if (currentOp === '-') {
            result = Number(firstVal) - Number(secondVal);
        }
        if (currentOp === '*') {
            result = Number(firstVal) * Number(secondVal);
        }
        if (currentOp === '/') {
            result = Number(firstVal) / Number(secondVal);
        }

        //reset all containers
        currentAddStep = 0;
        currentOp = '';
        firstVal = 0;
        secondVal = 0;

        return result;
    }
}

console.log('New server created, waiting for connections...');
// Add the connection listener that will be triggered once the connection is etablished.

wss.on('connection', function(ws) {
    console.log('Server was connected.');
    //  Add the listener for that particular websocket connection instance.
    ws.on('message', function(message) {
        console.log('Server received message: %s', message);
        var response = '';
        // Send back the message that we receive from the browser

        message = message.replace(/(\n|\r)+$/, '');
        response = message;

        if (currentAddStep > 0) {
            response = math(message);
        }

        if (message === "hi" && currentAddStep === 0) {
            response = 'Well, hello there';
        }

        if (message === "bye" && currentAddStep === 0) {
            response = 'Buh bye';
        }

        if (message === "goodbye" && currentAddStep === 0) {
            response = 'See ya';
        }

        if (message === 'time' && currentAddStep === 0) {
            var now = getTime().toString();
            response = now;
        }

        if (message === 'math') {
            response = math();
        }

        ws.send(response);
    });
});