import { Restaurant } from "restaurantApiTypes";
import Database from "../database";

const getRestaurants = async (): Promise<Restaurant[] | null> => {
    const restaurants = await Database.get("restaurant").catch(error => {
        throw error;
    });
    return restaurants as Restaurant[] | null;
};

const addRestaurant = async (restaurant: Omit<Restaurant, "id">): Promise<number | null> => {
    const id = await Database.insert("restaurant", restaurant).catch(error => {
        throw error;
    });
    return id;
};

const updateRestaurant = async (
    id: number,
    restaurant: Partial<Omit<Restaurant, "id">>
): Promise<number | null> => {
    const updated = await Database.update("restaurant", id, restaurant).catch(error => {
        throw error;
    });
    return updated;
};

const deleteRestaurantById = async (id: number): Promise<number | null> => {
    const deleted = await Database.delete("restaurant", id).catch(error => {
        throw error;
    });
    return deleted;
};

export { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurantById };
