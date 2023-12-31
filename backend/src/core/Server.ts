import ws from "ws";
import https from "https";
import Connection from "../classes/Connection";
import SocketManager from "./managers/SocketManager";
import ConnectionManager from "./managers/ConnectionManager";
import { debug } from "..";
import { httpsOptions } from "../config";

class Server extends ws.Server {
    private readonly connectionManager = new ConnectionManager();
    public readonly socketManager = new SocketManager(this.connectionManager);
    constructor() {
        debug.log("Server created");
        super(
            process.env.NODE_ENV === "production"
                ? {
                      server: https
                          .createServer(httpsOptions)
                          .listen(8080, () => debug.info("Server listening on port 8080 (HTTPS)")),
                  }
                : { port: 8080 }
        );
        this.on("listening", () => debug.info("WebSocket Server listening on port 8080"));
        this.on("connection", (socket, req) => {
            debug.log(`Received connection from ${req.socket.remoteAddress}`);
            const connection = new Connection(this.connectionManager.generateId(), socket);
            this.connectionManager.addConnection(connection);

            socket.on("close", () => {
                debug.log(`Connection ${connection.id} closed`);
                this.connectionManager.removeConnection(connection.id);
            });
        });
    }

    public broadcast(msg: string): void {
        debug.log(`Broadcasting message: ${msg}`);
        this.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(msg);
            }
        });
    }

    public send(clientId: number, msg: string): void {
        debug.log(`Sending message to ${clientId}: ${msg}`);
        const connection = this.connectionManager.getConnection(clientId);
        if (connection) connection.send(msg);
    }
}

export default Server;
