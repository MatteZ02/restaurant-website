import { CartItem, MenuItem } from "restaurantApiTypes";
import { Cart as ApiCart } from "restaurantApiTypes";
import { debug } from "..";

class Cart {
    private readonly items = new Map<number, CartItem>();
    add(item: MenuItem): void {
        debug.log(`Adding item ${item.id} to cart`);
        const existingItem = this.items.get(item.id);
        existingItem ? existingItem.quantity++ : this.items.set(item.id, { quantity: 1, item });
    }

    remove(itemId: number): void {
        debug.log(`Removing item ${itemId} from cart`);
        const existingItem = this.items.get(itemId);
        if (!existingItem) return;
        existingItem.quantity--;
        if (existingItem.quantity === 0) this.items.delete(itemId);
    }

    getItems(): IterableIterator<CartItem> {
        debug.log(`Getting items from cart`);
        return this.items.values();
    }

    get(): ApiCart {
        debug.log(`Getting cart`);
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
