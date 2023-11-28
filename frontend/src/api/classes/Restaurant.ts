import { Restaurant as ApiRestaurant, Order } from "restaurantApiTypes";
import requestHandler from "../core/requestHandler";

class Restaurant implements ApiRestaurant {
    public readonly id: number;
    public readonly name: string;
    public readonly address: string;
    public readonly opening_hours: string;

    constructor(restaurant: ApiRestaurant) {
        this.id = restaurant.id;
        this.name = restaurant.name;
        this.address = restaurant.address;
        this.opening_hours = restaurant.opening_hours;
    }

    public async update(data: Partial<ApiRestaurant>, token: string): Promise<Restaurant> {
        const restaurant = await requestHandler
            .put<{ message: string; data: ApiRestaurant }>(`restaurant`, data, {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            })
            .catch(err => {
                throw new Error(err.message);
            });
        return new Restaurant(restaurant.data);
    }

    public async delete(token: string): Promise<ApiRestaurant> {
        const req = await requestHandler
            .delete<{
                message: string;
                data: ApiRestaurant;
            }>(`restaurant`, {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            })
            .catch(err => {
                throw new Error(err.message);
            });
        return req.data;
    }

    public async getOrders(token: string): Promise<ApiRestaurant> {
        const req = await requestHandler
            .get<{
                message: string;
                data: ApiRestaurant;
            }>(`restaurant/${this.id}/order`, {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            })
            .catch(err => {
                throw new Error(err.message);
            });
        return req.data;
    }

    public async postOrder(data: Order) {
        const req = await requestHandler.post<{ data: Order }>(
            `restaurant/${this.id}/order`,
            data,
            {
                "Content-type": "application/json",
            }
        );
        return req.data;
    }
}

export default Restaurant;
