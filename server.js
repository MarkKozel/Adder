const WebSocketServer = require('ws').Server
const { createServer } = require('http');
const PORT = 3123;

let server = createServer();
let wss = new WebSocketServer({ server });// Create an instance of websocket server

let getTime = function () {
    var now = new Date();
    return now;
}

//Containers for math functions
let currentAddStep = 0; //1=start, 2=got op, 3=1st num, 4=2nd num
let currentOp = ''; //+,-,*,/
let firstVal = 0; //first number for operation
let secondVal = 0; //second number for operation
let math = function (input) {
    if (input === 'stop') { //Exit in the middle
        //reset all containers
        currentAddStep = 0;
        currentOp = '';
        firstVal = 0;
        secondVal = 0;
        return 'math action stopped';
    }

    if (input === 'math' && currentAddStep === 0) { //start a math routine...request the operator
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
// Add the connection listener that will be triggered once the connection is established.
wss.on('close', () => {
    console.info('wss closed');
});

wss.on('connection', function (ws) {
    console.log('Server was connected.');

    ws.on('error', err => {
        console.error(err);
    })

    ws.on('open', data => {
        console.error(data);
    })
    //  Add the listener for that particular websocket connection instance.
    ws.on('message', function (message) {
        console.log('Server received message: %s', message);


        let msg = message.toString().replace(/(\n|\r|\r\n)/g, '');

        if (currentAddStep > 0) {
            response = math(msg);
        }

        if (msg === "hi" && currentAddStep === 0) {
            response = 'Well, hello there';
        }

        if (msg === "bye" && currentAddStep === 0) {
            response = 'Buh bye';
        }

        if (msg === "goodbye" && currentAddStep === 0) {
            response = 'See ya';
        }

        if (msg === 'time' && currentAddStep === 0) {
            var now = getTime().toString();
            response = now;
        }

        if (msg === 'math') {
            response = math(msg);
        }

        ws.send(response);
    });
});

server.listen(PORT, res => {
    console.log(`Started Adder Server on port ${PORT}`);
})