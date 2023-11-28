// version 1.1.0

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
        price: number;
        thumbnail_url: string;
        category: MenuCategory;
        timesOrdered: number;
    }

    enum MenuCategory {
        Burger = 1,
    }

    export interface Order {
        id: number;
        restaurant: number; // restaurant id
        user: number; // user id
        items: number[]; // item ids
        status: OrderStatus;
        createdAt: string;
    }

    export interface OrderItem {
        id: number;
        menuItem: number; // item id
        quantity: number;
    }

    export enum OrderStatus {
        Pending = 1,
        Accepted = 2,
        Rejected = 3,
        Delivered = 4,
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
