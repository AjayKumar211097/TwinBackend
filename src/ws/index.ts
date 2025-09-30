import { RawData, WebSocketServer } from "ws";
import { log } from "../utils/logger";
import { AppDatabase, db } from "../utils/IAppDatabase";

const WSS_PORT = process.env.WSS_PORT || 4000;
const wss = new WebSocketServer({ port: Number(WSS_PORT) });

function handleMessage(ws: any, msg: any, db: AppDatabase): void {
    console.log("Received message:", msg);
    try {
        const data = JSON.parse(msg as string);
        if (data.charges !== undefined) {
            db.charges = data.charges; // update central database
            console.log(`Updated charges: ${db.charges}`);
            ws.send(JSON.stringify({ status: "ok", charges: db.charges }));

        } else {
            ws.send(JSON.stringify({ status: "ignored" }));
        }
    } catch (err) {
        console.error('Invalid message format', err);
        ws.send(JSON.stringify({ status: "invalid format" }));
    }
}

wss.on("connection", (ws) => {
    log(" External charger connected");

    ws.on("message", (msg) => handleMessage(ws, msg, db));


    ws.on("close", () => {
        log("Charger disconnected");
    });
}).on("error", (err) => {
    log("WebSocket server error:", err);
});

log(`WebSocket server running on port ${WSS_PORT}`);


