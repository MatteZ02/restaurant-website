import { MenuItem } from "restaurantApiTypes";
import RestaurantApiWrapper from "../api";
import { noop } from "../util/utils";

const restaurantApiWrapper = new RestaurantApiWrapper();

const editMenuItem = async (id: number, menuItem: Partial<MenuItem>) => {
    const res = await restaurantApiWrapper.putMenuItem(menuItem, id).catch(noop);
    return res;
};

export default editMenuItem;
