import { Order, OrderItem } from "restaurantApiTypes";
import Database, { DatabaseOrder } from "../database";

const isOrder = (data: any): data is Order[] =>
    Array.isArray(data) && data.length && data[0].user && data[0].items && data[0].order_status;
const getOrderById = async (id: number): Promise<null | Order> => {
    const order = await Database.get("`Order`", id).catch(error => {
        throw error;
    });
    return isOrder(order) ? order[0] : null;
};

const getAllOrders = async (): Promise<null | Order[]> => {
    const orders = await Database.query(`SELECT * FROM \`Order\``).catch(error => {
        throw error;
    });
    return isOrder(orders) ? orders : null;
};

const getUserOrders = async (userId: number): Promise<null | Order[]> => {
    const orders = await Database.query(`SELECT * FROM \`Order\` WHERE user = ?`, [userId]).catch(
        error => {
            throw error;
        }
    );
    return isOrder(orders) ? orders : null;
};

const addItem = async (item: Omit<OrderItem, "id">): Promise<number | null> => {
    const id = await Database.insert("OrderItem", item).catch(error => {
        throw error;
    });
    return id;
};

const addOrderItems = async (items: string): Promise<number | null> => {
    const id = await Database.insert("OrderItems", { items }).catch(error => {
        throw error;
    });
    return id;
};

const addOrder = async (order: Omit<DatabaseOrder, "id">): Promise<number | null> => {
    const id = await Database.insert("`Order`", order).catch(error => {
        throw error;
    });
    return id;
};

const updateOrder = async (
    id: number,
    order: Partial<Omit<Order, "id" | "items">>
): Promise<number | null> => {
    const updated = await Database.update("`Order`", id, order).catch(error => {
        throw error;
    });
    return updated;
};

export { getOrderById, getAllOrders, getUserOrders, addOrder, addOrderItems, addItem, updateOrder };
