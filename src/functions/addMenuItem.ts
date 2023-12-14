import { MenuItem } from "restaurantApiTypes";
import RestaurantApiWrapper from "../api";
import { noop } from "../util/utils";

const restaurantApiWrapper = new RestaurantApiWrapper();

const addMenuItem = async (item: Omit<MenuItem, "id" | "timesOrdered">) => {
    const res = await restaurantApiWrapper.postMenuItem(item).catch(noop);
    return res;
};

export default addMenuItem;
