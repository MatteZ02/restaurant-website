import { CartItem, MenuItem } from "restaurantApiTypes";
import { Cart as ApiCart } from "restaurantApiTypes";

class Cart {
    private readonly items = new Map<number, CartItem>();
    add(item: MenuItem): void {
        const existingItem = this.items.get(item.id);
        existingItem ? existingItem.quantity++ : this.items.set(item.id, { quantity: 1, item });
    }

    remove(itemId: number): void {
        const existingItem = this.items.get(itemId);
        if (!existingItem) return;
        existingItem.quantity--;
        if (existingItem.quantity === 0) this.items.delete(itemId);
    }

    getItems(): IterableIterator<CartItem> {
        return this.items.values();
    }

    get(): ApiCart {
        return {
            total: [...this.items.values()].reduce(
                (acc, item) => acc + +item.item.price * item.quantity,
                0
            ),
            items: [...this.getItems()],
        };
    }
}

export default Cart;
