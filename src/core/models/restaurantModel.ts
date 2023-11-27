import { Restaurant } from "restaurantApiTypes";
import Database from "../database";

const isRestaurants = (data: any): data is Restaurant[] =>
    Array.isArray(data) && data.length && data[0].name && data[0].address && data[0].openingHours;
const getRestaurants = async (): Promise<Restaurant[] | null> => {
    const restaurants = await Database.get("restaurants").catch(error => {
        throw error;
    });
    return isRestaurants(restaurants) ? restaurants : null;
};

const addRestaurant = async (restaurant: Omit<Restaurant, "id">): Promise<number | null> => {
    const id = await Database.insert("restaurants", restaurant).catch(error => {
        throw error;
    });
    return id;
};

const updateRestaurant = async (
    id: number,
    restaurant: Partial<Omit<Restaurant, "id">>
): Promise<number | null> => {
    const updated = await Database.update("restaurants", id, restaurant).catch(error => {
        throw error;
    });
    return updated;
};

const deleteRestaurantById = async (id: number): Promise<number | null> => {
    const deleted = await Database.delete("restaurants", id).catch(error => {
        throw error;
    });
    return deleted;
};

export { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurantById };
