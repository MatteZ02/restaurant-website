import { MenuItem } from "restaurantApiTypes";
import RestaurantApiWrapper from "../api";

const restaurantApiWrapper = new RestaurantApiWrapper();

const editMenuItem = async (id: number, menuItem: Partial<MenuItem>) => {
    const res = await restaurantApiWrapper.putMenuItem(menuItem, id);
};

export default editMenuItem;
