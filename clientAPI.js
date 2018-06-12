'use strict';

var WebSocket = require('ws');

module.exports = class clientAPI {

    constructor() {
        this.clientCallback;
    }

    connect(callback) {
        // Setup websocket with callbacks.
        // Open the connection with the server.
        this.wsocket = new WebSocket('ws://192.168.170.249:1234/');

        this.wsocket.onopen = this.onopen.bind(this);
        this.wsocket.onclose = this.onclose.bind(this);
        this.wsocket.onmessage = this.initiateConnection.bind(this);
        this.wsocket.onerror = this.onerror.bind(this);

        this.clientCallback = callback; //Callback for client consumption

        console.log("connect() waiting for connection");
    }

    initiateConnection(message) {
        console.log("initiateConnection() rec'd connection");
        var connMsg = JSON.parse(message);
        if (connMsg.status === 1) {
            this.wsocket.onmessage = this.onmessage.bind(this); //Init done, switch to normal handler
            this.send("client CLI online");
        } else {
            console.log("initiateConnection() got " + connMsg.status);
        }
    }

    onopen(event) {
        console.log('onopen: ' + event.toString());
    }
    onclose(event) {
        console.log('onclose: ' + event.toString());
    }
    onerror(event) {
        console.log("onerror: " + event.toString());
    }
    onmessage(event) {
        console.log("onmessage() rec'd message");
        var msgReceived = event.data;
        console.log("Websocket server responds: " + msgReceived);
        //setTimeout(this.StartConversation.bind(this), 500);
        if (this.clientCallback) {
            this.clientCallback(event.data);
        }
    }

    isConnected() {
        return ((this.wsocket) && (this.wsocket.readyState === this.wsocket.OPEN));
    }

    closeConnection() {
        if (this.isConnected()) {
            this.send("client CLI offline");
            this.wsocket.close();
            console.log('Disconnected from server');
        } else {
            console.log("connection already closed");
        }
    }

    startConversation(callback) {
        this.clientCallback = callback;
    }

    send(msgToSend) {
        if (this.isConnected()) {
            console.log("Sending " + msgToSend);
            this.wsocket.send(msgToSend);
        } else {
            console.log("clientAPI: cannot send to closed socket");
        }
    }
}