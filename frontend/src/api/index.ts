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

class RestaurantApiWrapper {
    private token: string | null;
    constructor() {
        this.token = localStorage.getItem("token");
    }

    public async login(username: string, password: string): Promise<UserLoginResponse> {
        const req = await requestHandler.post<{ data: UserLoginResponse }>("auth/login", {
            username,
            password,
        });
        this.token = req.data.token;
        return req.data;
    }

    public async getMe(token: string): Promise<ApiUser> {
        const req = await requestHandler.get<{ data: ApiUser }>("auth/me", {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        });
        return req.data;
    }

    public async getMenu(): Promise<MenuItem[]> {
        const req = await requestHandler.get<{ data: MenuItem[] }>("menu");
        return req.data;
    }

    public async postMenuItem(data: Omit<MenuItem, "id">): Promise<MenuItem> {
        const req = await requestHandler.post<{ data: MenuItem }>("menu", data, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req.data;
    }

    public async putMenuItem(data: Partial<MenuItem>, id: number): Promise<MenuItem> {
        const req = await requestHandler.put<{ data: MenuItem }>(`menu/${id}`, data, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req.data;
    }

    public async deleteMenuItem(id: number): Promise<MenuItem> {
        const req = await requestHandler.delete<{ data: MenuItem }>(`menu/${id}`, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req.data;
    }

    public async getOrder(id: number): Promise<Order> {
        const req = await requestHandler.get<{ data: Order }>(`order/${id}`, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req.data;
    }

    public async putOrder(data: Order) {
        const req = await requestHandler.put<{ data: Order }>(`order/${data.id}`, data, {
            "Content-type": "application/json",
        });
        return req.data;
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

    public async postUSer(data: Omit<Omit<ApiUser, "level">, "id">): Promise<ApiUser> {
        const req = await requestHandler.post<{ data: ApiUser }>("user", data, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return req.data;
    }

    public async getUser(id: number): Promise<User> {
        const req = await requestHandler.get<{ data: ApiUser }>(`user/${id}`, {
            "Content-type": "application/json",
            Authorization: `Bearer ${this.token}`,
        });
        return new User(req.data);
    }
}

export default RestaurantApiWrapper;
