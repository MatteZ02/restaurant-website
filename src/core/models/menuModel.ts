import { MenuItem } from "restaurantApiTypes";
import Database from "../database";

const isMenu = (data: any): data is MenuItem[] =>
    Array.isArray(data) &&
    data.length &&
    data[0].name &&
    data[0].description &&
    data[0].price &&
    data[0].thumbnail_url &&
    data[0].category &&
    data[0].timesOrdered;
const getFullMenu = async (): Promise<MenuItem[] | null> => {
    const menu = await Database.get("menuItem").catch(error => {
        throw error;
    });
    return isMenu(menu) ? menu : null;
};

const addMenuItem = async (menuItem: Omit<MenuItem, "id">): Promise<number | null> => {
    const id = await Database.insert("menuItem", menuItem).catch(error => {
        throw error;
    });
    return id;
};

const updateMenuItem = async (
    id: number,
    menuItem: Partial<Omit<MenuItem, "id">>
): Promise<number | null> => {
    const updated = await Database.update("menuItem", id, menuItem).catch(error => {
        throw error;
    });
    return updated;
};

const deleteMenuItem = async (id: number): Promise<number | null> => {
    const deleted = await Database.delete("menuItem", id).catch(error => {
        throw error;
    });
    return deleted;
};

export { getFullMenu, addMenuItem, updateMenuItem, deleteMenuItem };
