import { User } from "restaurantApiTypes";
import Database from "../database";
import { compare } from "bcryptjs";

const isUser = (data: any): data is User =>
    data && data.username && data.email && data.level && data.phone && data.address;
const getUserById = async (id: number): Promise<User | null> => {
    const res = await Database.get("user", id);
    const user = res && res[0];
    return isUser(user) ? user : null;
};

const addUser = async (user: Omit<User, "id" | "level">): Promise<number | null> => {
    const insertableUser = {
        ...user,
        level: 3,
    };
    const id = await Database.insert("user", insertableUser).catch(error => {
        throw error;
    });
    return id;
};

const updateUser = async (
    id: number,
    user: Partial<Omit<User, "id" | "level">>
): Promise<number | null> => {
    const updated = await Database.update("user", id, user).catch(error => {
        throw error;
    });
    return updated;
};

const deleteUserById = async (id: number): Promise<number | null> => {
    const deleted = await Database.delete("user", id).catch(error => {
        throw error;
    });
    return deleted;
};

const login = async (
    username: string,
    password: string
): Promise<Omit<User, "password"> | null> => {
    const query = `SELECT * FROM user WHERE username = ?`;

    const rows = await Database.query(query, [username]).catch(error => {
        throw error;
    });

    const user = rows[0];
    if (!user) return null;
    const match = await compare(password, user.password);
    if (!match) return null;
    delete user.password;
    return user ?? null;
};

export { getUserById, addUser, updateUser, deleteUserById, login };
