import { MenuItem } from "restaurantApiTypes";
import RestaurantApiWrapper from "../api";

const restaurantApiWrapper = new RestaurantApiWrapper();

const addMenuItem = async (item: Omit<MenuItem, "id" | "timesOrdered">) => {
    const res = await restaurantApiWrapper.postMenuItem(item);
};

export default addMenuItem;
