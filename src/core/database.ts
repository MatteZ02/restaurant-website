import mysql from "mysql2/promise";
import { MenuItem, Order, OrderItem, OrderStatus, Restaurant, User } from "restaurantApiTypes";
import config from "../config";

export interface DatabaseOrder {
    user: number;
    items: number;
    order_status: OrderStatus;
}

type InsetDataType =
    | Omit<Restaurant, "id">
    | Omit<MenuItem, "id">
    | Omit<DatabaseOrder, "id">
    | { items: string }
    | Omit<OrderItem, "id">
    | Omit<User, "id">;

type UpdateDataType = Partial<InsetDataType>;

const pool = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
});

class Database {
    static async get(
        table: string,
        id?: number
    ): Promise<null | User[] | Restaurant[] | MenuItem[] | DatabaseOrder[]> {
        try {
            const query = `SELECT * FROM ${table}${id ? " WHERE id = ?" : ""}`;
            const [rows] = await pool.execute(query, id ? [id] : []);

            // @ts-ignore
            return rows.length ? rows : null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async query(query: string, values: any[] = []): Promise<null | any> {
        try {
            const [rows] = await pool.execute(query, values);
            // @ts-ignore
            return rows.length ? rows : null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async insert(table: string, data: InsetDataType): Promise<null | number> {
        try {
            const fields = Object.keys(data);
            const values = Object.values(data);
            const query = `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${values
                .map(() => "?")
                .join(", ")})`;
            const [rows] = await pool.execute(query, values);
            // @ts-ignore
            return rows.insertId;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async update(table: string, id: number, data: UpdateDataType): Promise<null | number> {
        try {
            const fields = Object.keys(data);
            const values = Object.values(data);
            const query = `UPDATE ${table} SET ${fields
                .map(field => `${field} = ?`)
                .join(", ")} WHERE id = ?`;
            const [rows] = await pool.execute(query, [...values, id]);
            // @ts-ignore
            return rows.affectedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(table: string, id: number): Promise<null | number> {
        try {
            const query = `DELETE FROM ${table} WHERE id = ?`;
            const [rows] = await pool.execute(query, [id]);
            // @ts-ignore
            return rows.affectedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default Database;
