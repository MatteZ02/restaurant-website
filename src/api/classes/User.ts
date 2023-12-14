import { User as ApiUser } from "restaurantApiTypes";
import requestHandler from "../core/requestHandler";

class User implements ApiUser {
    public readonly id: number;
    public readonly username: string;
    public readonly first_name: string;
    public readonly last_name: string;
    public readonly email: string;
    public readonly level: number;
    public readonly phone: string | null;
    public readonly address: string | null;

    constructor(
        user: ApiUser,
        public readonly token?: string
    ) {
        this.id = user.id;
        this.username = user.username;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.level = user.level;
        this.phone = user.phone;
        this.address = user.address;
    }

    public async update(data: Partial<ApiUser>): Promise<User> {
        const user = await requestHandler
            .put<{ message: string; data: ApiUser }>(`user/${this.id}`, data, {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.token}`,
            })
            .catch(err => {
                throw new Error(err.message);
            });
        return new User(user.data);
    }

    public async delete(): Promise<string> {
        const req = await requestHandler
            .delete<{
                message: string;
            }>(`user/${this.id}`, {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.token}`,
            })
            .catch(err => {
                throw new Error(err.message);
            });
        return req.message;
    }
}

export default User;
