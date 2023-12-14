import { Restaurant as ApiRestaurant } from "restaurantApiTypes";
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
}

export default Restaurant;
