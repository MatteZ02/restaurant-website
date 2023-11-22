// version 1.0.0

declare module "restaurantApiTypes" {
    export interface Restaurant {
        id: number;
        name: string;
        address: string;
        openingHours: string;
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

    export interface MenuCategory {
        id: number;
        name: "burgers" | "drinks" | "sides";
    }

    export interface Order {
        id: number;
        restaurant: Restaurant;
        user: User;
        items: OrderItem[];
        status: OrderStatus;
        createdAt: string;
    }

    export interface OrderItem {
        id: number;
        menuItem: MenuItem;
        quantity: number;
    }

    export interface OrderStatus {
        id: number;
        name: "pending" | "accepted" | "rejected" | "delivered";
    }

    export interface UserLevel {
        id: 3 | 2 | 1;
        name: "user" | "staff" | "admin";
    }

    export interface User {
        id: number;
        username: string;
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