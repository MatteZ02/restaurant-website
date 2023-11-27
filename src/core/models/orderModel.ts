import { Order } from "restaurantApiTypes";
import Database from "../database";

const isOrder = (data: any): data is Order[] =>
    Array.isArray(data) &&
    data.length &&
    data[0].restaurant &&
    data[0].user &&
    data[0].items &&
    data[0].status &&
    data[0].createdAt;
const getOrderById = async (id: number): Promise<null | Order> => {
    const order = await Database.get("order", id).catch(error => {
        throw error;
    });
    return isOrder(order) ? order[0] : null;
};

const getRestaurantOrders = async (restaurantId: number): Promise<null | Order[]> => {
    const orders = await Database.query(`SELECT * FROM \`order\` WHERE restaurant = ?`, [
        restaurantId,
    ]).catch(error => {
        throw error;
    });
    return isOrder(orders) ? orders : null;
};

const getUserOrders = async (userId: number): Promise<null | Order[]> => {
    const orders = await Database.query(`SELECT * FROM \`order\` WHERE user = ?`, [userId]).catch(
        error => {
            throw error;
        }
    );
    return isOrder(orders) ? orders : null;
};

const addOrder = async (order: Omit<Order, "id">): Promise<number | null> => {
    const id = await Database.insert("order", order).catch(error => {
        throw error;
    });
    return id;
};

const updateOrder = async (
    id: number,
    order: Partial<Omit<Order, "id">>
): Promise<number | null> => {
    const updated = await Database.update("order", id, order).catch(error => {
        throw error;
    });
    return updated;
};

export { getOrderById, getRestaurantOrders, getUserOrders, addOrder, updateOrder };
