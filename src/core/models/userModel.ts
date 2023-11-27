import { User, UserLevel } from "restaurantApiTypes";
import Database from "../database";

const isUser = (data: any): data is User =>
    data && data.username && data.email && data.level && data.phone && data.address;
const getUserById = async (id: number): Promise<User | null> => {
    const res = await Database.get("users", id);
    const user = res && res[0];
    return isUser(user) ? user : null;
};

const addUser = async (user: Omit<User, "id" | "level">): Promise<number | null> => {
    const insertableUser = {
        ...user,
        level: {
            id: 3,
            name: "user",
        } as UserLevel,
    };
    const id = await Database.insert("users", insertableUser).catch(error => {
        throw error;
    });
    return id;
};

const updateUser = async (
    id: number,
    user: Partial<Omit<User, "id" | "level">>
): Promise<number | null> => {
    const updated = await Database.update("users", id, user).catch(error => {
        throw error;
    });
    return updated;
};

const deleteUserById = async (id: number): Promise<number | null> => {
    const deleted = await Database.delete("users", id).catch(error => {
        throw error;
    });
    return deleted;
};

const login = async (username: string, password: string): Promise<User | null> => {
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const [rows] = await Database.query(query, [username, password]).catch(error => {
        throw error;
    });
    // @ts-ignore
    return rows.length ? rows[0] : null;
};

export { getUserById, addUser, updateUser, deleteUserById, login };
