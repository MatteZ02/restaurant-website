import { MenuItem } from "restaurantApiTypes";
import Database from "../database";
import { debug } from "../..";

const getFullMenu = async (): Promise<MenuItem[] | null> => {
    debug.log("getFullMenu");
    const menu = await Database.get("MenuItem").catch(error => {
        throw error;
    });
    return menu as MenuItem[] | null;
};

const addMenuItem = async (menuItem: Omit<MenuItem, "id">): Promise<number | null> => {
    debug.log("addMenuItem");
    const id = await Database.insert("MenuItem", menuItem).catch(error => {
        throw error;
    });
    return id;
};

const updateMenuItem = async (
    id: number,
    menuItem: Partial<Omit<MenuItem, "id">>
): Promise<number | null> => {
    debug.log("updateMenuItem");
    const updated = await Database.update("MenuItem", id, menuItem).catch(error => {
        throw error;
    });
    return updated;
};

const deleteMenuItem = async (id: number): Promise<number | null> => {
    debug.log("deleteMenuItem");
    const deleted = await Database.delete("MenuItem", id).catch(error => {
        throw error;
    });
    return deleted;
};

export { getFullMenu, addMenuItem, updateMenuItem, deleteMenuItem };
