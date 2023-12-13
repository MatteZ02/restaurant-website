import Restaurant from "./classes/Restaurant";
import {
    Restaurant as ApiRestaurant,
    User as ApiUser,
    Cart,
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
        const req = await requestHandler
            .post<UserLoginResponse>("auth/login", {
                username,
                password,
            })
            .catch(err => {
                throw err;
            });
        if (!req) return null;

        localStorage.setItem("token", req.token);
        this.token = req.token;
        return req;
    }

    public async getMe(token: string): Promise<ApiUser> {
        const req = await requestHandler
            .get<ApiUser>("auth/me", {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async getMenu(): Promise<MenuItem[]> {
        const req = await requestHandler.get<MenuItem[]>("menu").catch(err => {
            throw err;
        });
        return req;
    }

    public async postMenuItem(data: Omit<MenuItem, "id" | "timesOrdered">): Promise<MenuItem> {
        const req = await requestHandler
            .post<{ data: MenuItem }>("menu", data, {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.token}`,
            })
            .catch(err => {
                throw err;
            });
        return req.data;
    }

    public async putMenuItem(data: Partial<MenuItem>, id: number): Promise<MenuItem> {
        const req = await requestHandler
            .put<MenuItem>(`menu/${id}`, data, {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.token}`,
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async deleteMenuItem(id: number): Promise<MenuItem> {
        const req = await requestHandler
            .delete<MenuItem>(`menu/${id}`, {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.token}`,
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async getRestaurants(): Promise<Restaurant[]> {
        const req = await requestHandler.get<{ data: ApiRestaurant[] }>("restaurant").catch(err => {
            throw err;
        });
        return req.data.map(restaurant => new Restaurant(restaurant));
    }

    public async postRestaurant(data: Omit<ApiRestaurant, "id">): Promise<Restaurant> {
        const req = await requestHandler
            .post<{ data: ApiRestaurant }>("restaurant", data, {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.token}`,
            })
            .catch(err => {
                throw err;
            });
        return new Restaurant(req.data);
    }

    public async postUser(data: Omit<postApiUser, "id" | "level">): Promise<ApiUser> {
        const req = await requestHandler
            .post<ApiUser>("user", data, {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.token}`,
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async getUser(id: number): Promise<User> {
        const req = await requestHandler
            .get<ApiUser>(`user/${id}`, {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.token}`,
            })
            .catch(err => {
                throw err;
            });
        return new User(req, this.token ?? undefined);
    }

    public async getCart(): Promise<Cart> {
        const req = await requestHandler
            .get<Cart>("cart", {
                "Content-type": "application/json",
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async postCartItem(data: MenuItem) {
        const req = await requestHandler
            .post<Cart>("cart", data, {
                "Content-type": "application/json",
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async deleteCartItem(itemId: number) {
        const req = await requestHandler
            .delete<Cart>(`cart/${itemId}`, {
                "Content-type": "application/json",
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async getOrders(): Promise<Order[]> {
        const req = await requestHandler
            .get<Order[]>("order", {
                "Content-type": "application/json",
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async getOrderById(id: number): Promise<Order> {
        const req = await requestHandler
            .get<Order>(`order/${id}`, {
                "Content-type": "application/json",
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async postOrder(data: Order): Promise<Order> {
        const req = await requestHandler
            .post<Order>("order", data, {
                "Content-type": "application/json",
            })
            .catch(err => {
                throw err;
            });
        return req;
    }

    public async patchOrder(id: number, data: Partial<Order>): Promise<Order> {
        const req = await requestHandler
            .patch<Order>(`order/${id}`, data, {
                "Content-type": "application/json",
                Authorization: `Bearer ${this.token}`,
            })
            .catch(err => {
                throw err;
            });
        return req;
    }
}

export default RestaurantApiWrapper;
