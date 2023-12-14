import { debug } from "../..";
import Connection from "../../classes/Connection";

class ConnectionManager {
    private readonly connections = new Map<number, Connection>();

    public generateId(): number {
        debug.log("Generating connection id");
        const values = this.connections.values();
        let id: number = 1;
        for (const connection of values) {
            if (connection.id === id) id++;
            else break;
        }
        return id;
    }

    public addConnection(connection: Connection): void {
        debug.log(`Adding connection ${connection.id}`);
        this.connections.set(connection.id, connection);
    }

    public getConnection(id: number): Connection | undefined {
        debug.log(`Getting connection ${id}`);
        return this.connections.get(id);
    }

    public findConnection(predicate: (connection: Connection) => boolean): Connection | undefined {
        debug.log(`Finding connection`);
        const values = this.connections.values();
        for (const connection of values) {
            if (predicate(connection)) return connection;
        }
        return undefined;
    }

    public findConnections(predicate: (connection: Connection) => boolean): Connection[] {
        debug.log(`Finding connections`);
        const values = this.connections.values();
        const connections: Connection[] = [];
        for (const connection of values) {
            debug.log(`Checking connection ${connection.id}`);
            if (predicate(connection)) connections.push(connection);
        }
        return connections;
    }

    public removeConnection(id: number): void {
        debug.log(`Removing connection ${id}`);
        this.connections.delete(id);
    }
}

export default ConnectionManager;
