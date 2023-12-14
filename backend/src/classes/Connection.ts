import { WebSocket } from "ws";
import { debug } from "..";

class Connection {
    constructor(
        public readonly id: number,
        private readonly socket: WebSocket,
        public type?: "order" | "staff",
        public orderId?: number
    ) {
        this.socket.on("message", msg => {
            debug.log(`Received message from ${this.id}: ${msg}`);
            const data = JSON.parse(msg.toString());
            if (data.type) this.type = data.type;
            if (data.orderId) {
                this.type = "order";
                this.orderId = data.orderId;
            }
        });
    }

    public send(msg: string): void {
        debug.log(`Sending message to ${this.id}: ${msg}`);
        this.socket.send(msg);
    }
}

export default Connection;
