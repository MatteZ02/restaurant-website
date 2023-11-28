import { MenuItem } from "restaurantApiTypes";
import Database from "../database";

const getFullMenu = async (): Promise<MenuItem[] | null> => {
    const menu = await Database.get("MenuItem").catch(error => {
        throw error;
    });
    return menu as MenuItem[] | null;
};

const addMenuItem = async (menuItem: Omit<MenuItem, "id">): Promise<number | null> => {
    const id = await Database.insert("MenuItem", menuItem).catch(error => {
        throw error;
    });
    return id;
};

const updateMenuItem = async (
    id: number,
    menuItem: Partial<Omit<MenuItem, "id">>
): Promise<number | null> => {
    const updated = await Database.update("MenuItem", id, menuItem).catch(error => {
        throw error;
    });
    return updated;
};

const deleteMenuItem = async (id: number): Promise<number | null> => {
    const deleted = await Database.delete("MenuItem", id).catch(error => {
        throw error;
    });
    return deleted;
};

export { getFullMenu, addMenuItem, updateMenuItem, deleteMenuItem };
