import express, { Request, Response } from 'express';
import WebSocket, { WebSocketServer } from 'ws';

const PORT = 3000;

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.json({
        data: "response from get",
    });
});

const server = app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});

const websocketServer1 = new WebSocketServer({ noServer: true });
const websocketServer2 = new WebSocketServer({ noServer: true });

server.on('upgrade', (req: Request, socket, head) => {
    const pathname = req.url;
    console.log(pathname);
    
    switch (pathname) {
        case '/ws-path1': {
            websocketServer1.handleUpgrade(req, socket, head, (ws) => {
                websocketServer1.emit('connection', ws);
            })
            break;
        }
        case '/ws-path2': {
            websocketServer2.handleUpgrade(req, socket, head, (ws) => {
                websocketServer2.emit('connection', ws);
            })
            break;
        }
        default:
            socket.destroy();
    }
});

websocketServer1.on('connection', (socket) => {
    socket.on('message', (message) => console.log("wss1", message.toString()));
})

websocketServer2.on('connection', (socket) => {
    socket.on('message', (message) => console.log("wss2", message.toString()));
})

websocketServer1.on('listening', () => {
    console.log('listening /ws-path');
})
websocketServer2.on('listening', () => {
    console.log('listening /ws-path2');
})
