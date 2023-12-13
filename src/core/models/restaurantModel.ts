import { Restaurant } from "restaurantApiTypes";
import Database from "../database";
import { debug } from "../..";

const getRestaurants = async (): Promise<Restaurant[] | null> => {
    debug.log("getRestaurants");
    const restaurants = await Database.get("Restaurant").catch(error => {
        throw error;
    });
    return restaurants as Restaurant[] | null;
};

const addRestaurant = async (restaurant: Omit<Restaurant, "id">): Promise<number | null> => {
    debug.log("addRestaurant");
    const id = await Database.insert("Restaurant", restaurant).catch(error => {
        throw error;
    });
    return id;
};

const updateRestaurant = async (
    id: number,
    restaurant: Partial<Omit<Restaurant, "id">>
): Promise<number | null> => {
    debug.log("updateRestaurant");
    const updated = await Database.update("Restaurant", id, restaurant).catch(error => {
        throw error;
    });
    return updated;
};

const deleteRestaurantById = async (id: number): Promise<number | null> => {
    debug.log("deleteRestaurantById");
    const deleted = await Database.delete("Restaurant", id).catch(error => {
        throw error;
    });
    return deleted;
};

export { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurantById };
