import { MenuItem } from "restaurantApiTypes";

interface CartItem {
    quantity: number;
    item: MenuItem;
}

class Cart {
    items = new Map<number, CartItem>();

    add(item: MenuItem) {
        const existingItem = this.items.get(item.id);
        existingItem ? existingItem.quantity++ : this.items.set(item.id, { quantity: 1, item });
    }

    remove(item: MenuItem) {
        const existingItem = this.items.get(item.id);
        if (!existingItem) return;
        existingItem.quantity--;
        if (existingItem.quantity === 0) this.items.delete(item.id);
    }

    getItems() {
        return this.items.values();
    }
}

export default Cart;
