import { Order, OrderItem } from "restaurantApiTypes";
import Database, { DatabaseOrder } from "../database";
import { debug } from "../..";

const isOrder = (data: any): data is DatabaseOrder[] =>
    Array.isArray(data) && data.length && data[0].user && data[0].items && data[0].order_status;

const getOrderById = async (id: number): Promise<null | DatabaseOrder> => {
    debug.log("getOrderById");
    const order = await Database.get("`Order`", id).catch(error => {
        throw error;
    });
    return isOrder(order) ? order[0] : null;
};

const getAllOrders = async (): Promise<null | DatabaseOrder[]> => {
    debug.log("getAllOrders");
    const orders = await Database.query(`SELECT * FROM \`Order\``).catch(error => {
        throw error;
    });
    return isOrder(orders) ? orders : null;
};

const getUserOrders = async (userId: number): Promise<null | DatabaseOrder[]> => {
    debug.log("getUserOrders");
    const orders = await Database.query(`SELECT * FROM \`Order\` WHERE user = ?`, [userId]).catch(
        error => {
            throw error;
        }
    );
    return isOrder(orders) ? orders : null;
};

const getOrderItems = async (id: number): Promise<null | { id: number; items: string }> => {
    debug.log("getOrderItems");
    const items = await Database.query(`SELECT * FROM OrderItems WHERE id = ?`, [id]).catch(
        error => {
            throw error;
        }
    );
    return Array.isArray(items) && items.length ? items[0] : null;
};

const getOrderItem = async (id: number): Promise<null | OrderItem> => {
    debug.log("getOrderItem");
    const items = await Database.query(`SELECT * FROM OrderItem WHERE id = ?`, [id]).catch(
        error => {
            throw error;
        }
    );
    return Array.isArray(items) && items.length ? items[0] : null;
};

const addItem = async (item: Omit<OrderItem, "id">): Promise<number | null> => {
    debug.log("addItem");
    const id = await Database.insert("OrderItem", item).catch(error => {
        throw error;
    });
    return id;
};

const addOrderItems = async (items: string): Promise<number | null> => {
    debug.log("addOrderItems");
    const id = await Database.insert("OrderItems", { items }).catch(error => {
        throw error;
    });
    return id;
};

const addOrder = async (order: Omit<DatabaseOrder, "id">): Promise<number | null> => {
    debug.log("addOrder");
    const id = await Database.insert("`Order`", order).catch(error => {
        throw error;
    });
    return id;
};

const updateOrder = async (
    id: number,
    order: Partial<Omit<Order, "id" | "items">>
): Promise<number | null> => {
    debug.log("updateOrder");
    const updated = await Database.update("`Order`", id, order).catch(error => {
        throw error;
    });
    return updated;
};

export {
    getOrderById,
    getAllOrders,
    getUserOrders,
    addOrder,
    addOrderItems,
    addItem,
    updateOrder,
    getOrderItems,
    getOrderItem,
};
