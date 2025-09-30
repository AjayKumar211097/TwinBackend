import WebSocket, { WebSocketServer } from "ws";
import { updateChargerStatus } from "../utils/dbControllers";
import { log } from "../utils/logger";

const WSS_PORT = process.env.WSS_PORT || 4000;
const wss = new WebSocketServer({ port: Number(WSS_PORT) });

wss.on("connection", (ws) => {
    log(" External charger connected");

    ws.on("message", (msg) => {
        const data = JSON.parse(msg.toString());
        log("Received from charger:", data);

        // Update REST data in DB
        updateChargerStatus(data);

        // Respond back (ACK)
        ws.send(JSON.stringify({ status: "ok", received: data }));
    });

    ws.on("close", () => {
        log("Charger disconnected");
    });
}).on("error", (err) => {
    log("WebSocket server error:", err);
});

log(`WebSocket server running on port ${WSS_PORT}`);
