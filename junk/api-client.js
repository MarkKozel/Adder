var client = require('./clientAPI.js');
const readline = require('readline-sync');

echoConnect = new client();

var manageReply = function(message) {
    console.log("cli got : " + message);
}

echoConnect.connect(manageReply);

var msgSend = readline.question("Enter info (ctrl-c to end) ");
while (1) {
    echoConnect.send(msgSend);
    msgSend = readline.question("Enter info (ctrl-c to end) ");
}

echoConnect.closeConnection();