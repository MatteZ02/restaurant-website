import { Order } from "restaurantApiTypes";
import ConnectionManager from "./ConnectionManager";
import { debug } from "../..";

class SocketManager {
    constructor(private readonly connectionManager: ConnectionManager) {
        debug.log("SocketManager created");
    }

    public sendOrderUpdate(OrderId: number, order: Order | Partial<Order>): void {
        debug.log(`Sending order update for order ${OrderId}`);
        const connections = this.connectionManager.findConnections(connection => {
            return connection.type === "order" && +(connection.orderId ?? 0) === OrderId;
        });
        if (!connections.length) return debug.log(`No connections found for order ${OrderId}`);
        connections.forEach(connection => connection.send(JSON.stringify(order)));
    }

    public sendNewOrder(order: Order): void {
        debug.log(`Sending new order ${order.id}`);
        const connections = this.connectionManager.findConnections(connection => {
            return connection.type === "staff";
        });
        if (!connections.length) return debug.log(`No connections found for staff`);
        connections.forEach(connection => connection.send(JSON.stringify(order)));
    }
}

export default SocketManager;
