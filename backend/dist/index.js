import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
const allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount = userCount + 1;
    console.log("user connected " + userCount);
    socket.on("message", (message) => {
        console.log("message received " + message.toString());
        for (const s of allSockets) {
            // Broadcast to all except sender
            if (s !== socket && s.readyState === s.OPEN) {
                s.send(message.toString() + " message sent from the server");
            }
        }
    });
});
//# sourceMappingURL=index.js.map