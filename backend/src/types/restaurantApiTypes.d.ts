// version 1.4.0

declare module "restaurantApiTypes" {
    export interface Restaurant {
        id: number;
        name: string;
        address: string;
        opening_hours: string;
    }

    export interface MenuItem {
        id: number;
        name: string;
        description: string;
        price: string;
        category: MenuCategory;
        timesOrdered: number;
    }

    enum MenuCategory {
        Burger = 1,
        Sides = 2,
        Drinks = 3,
    }

    export interface Order {
        id: number;
        user: number; // user id
        items: OrderItem[];
        order_status: OrderStatus;
    }

    export interface OrderItem {
        id: number;
        item: number; // item id
        quantity: number;
    }

    export enum OrderStatus {
        Pending = 1,
        Accepted = 2,
        Rejected = 3,
        Delivered = 4,
    }

    export interface CartItem {
        quantity: number;
        item: MenuItem;
    }

    export interface Cart {
        total: number;
        items: CartItem[];
    }

    export enum UserLevel {
        Admin = 1,
        Staff = 2,
        User = 3,
    }

    export interface User {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        level: UserLevel;
        phone: string | null;
        address: string | null;
    }

    export interface UserLoginResponse {
        token: string;
        user: User;
    }
}
