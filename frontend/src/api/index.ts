import Restaurant from "./classes/Restaurant";
import {
    Restaurant as ApiRestaurant,
    User as ApiUser,
    MenuItem,
    Order,
    UserLoginResponse,
} from "restaurantApiTypes";
import requestHandler from "./core/requestHandler";
import User from "./classes/User";

interface postApiUser extends Partial<ApiUser> {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
}

class RestaurantApiWrapper {
    private token: string | null;
    constructor() {
        this.token = localStorage.getItem("token");
    }

    public async login(username: string, password: string): Promise<UserLoginResponse | null> {
        const req = await requestHandler.post<UserLoginResponse>("auth/login", {
            username,
            password,
        });

        this.token = req.token;
        return req;
    }

    public async getMe(token: string): Promise<ApiUser> {
        const req = await requestHandler.get<ApiUser>("auth/me", {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        });
        return req;
    }

    public async getMenu(): Promise<MenuItem[]> {
        const req = await requestHandler.get<MenuItem[]>("menu");
        return req;
    }

    public async postMenuItem(data: Omit<MenuItem, "id" | "timesOrdered">): Promise<MenuItem> {
        const req = await requestHandler.post<{ data: MenuItem }>("menu", data, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req.data;
    }

    public async putMenuItem(data: Partial<MenuItem>, id: number): Promise<MenuItem> {
        const req = await requestHandler.put<MenuItem>(`menu/${id}`, data, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req;
    }

    public async deleteMenuItem(id: number): Promise<MenuItem> {
        const req = await requestHandler.delete<MenuItem>(`menu/${id}`, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req;
    }

    public async getOrder(id: number): Promise<Order> {
        const req = await requestHandler.get<Order>(`order/${id}`, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req;
    }

    public async putOrder(data: Order) {
        const req = await requestHandler.put<Order>(`order/${data.id}`, data, {
            "Content-type": "application/json",
        });
        return req;
    }

    public async getRestaurants(): Promise<Restaurant[]> {
        const req = await requestHandler.get<{ data: ApiRestaurant[] }>("restaurant");
        return req.data.map(restaurant => new Restaurant(restaurant));
    }

    public async postRestaurant(data: Omit<ApiRestaurant, "id">): Promise<Restaurant> {
        const req = await requestHandler.post<{ data: ApiRestaurant }>("restaurant", data, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return new Restaurant(req.data);
    }

    public async postUser(data: Omit<postApiUser, "id" | "level">): Promise<ApiUser> {
        const req = await requestHandler.post<ApiUser>("user", data, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req;
    }

    public async getUser(id: number): Promise<User> {
        const req = await requestHandler.get<ApiUser>(`user/${id}`, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return new User(req, this.token ?? undefined);
    }
}

export default RestaurantApiWrapper;
