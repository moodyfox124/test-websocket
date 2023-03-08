import WebSocket from "ws";

const client = new WebSocket('ws://localhost:3000/ws-path2');

client.on('open', () => {
    client.send('Hello');
});