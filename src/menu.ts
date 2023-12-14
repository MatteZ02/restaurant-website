import { Cart } from "restaurantApiTypes";
import RestaurantApiWrapper from "./api";
import { decrease, increase } from "./functions/counter";
import { noop } from "./util/utils";

function updateCartDialog(cart: Cart) {
    const cartDialog = document.getElementsByClassName("cartdialog")[0] as HTMLDialogElement;
    if (!cartDialog) return;
    const cartDialogBtn = cartDialog.getElementsByClassName("cartB")[0] as HTMLLinkElement;
    if (!cartDialogBtn) return;
    cartDialogBtn.innerText = `${cart.items.reduce(
        (acc, curr) => acc + curr.quantity,
        0
    )} items in cart`;
    if (cart.items.length > 0) cartDialog.open = true;
    else cartDialog.open = false;
}

const restaurantApiWrapper = new RestaurantApiWrapper();

const menu = document.getElementById("menu");
const burgerHeader = document.createElement("h1");
burgerHeader.innerText = "Burgers";
menu?.appendChild(burgerHeader);
const burgers = document.createElement("section");
burgers.id = "burgers";
menu?.appendChild(burgers);
const sidesHeader = document.createElement("h1");
sidesHeader.innerText = "Sides";
menu?.appendChild(sidesHeader);
const sides = document.createElement("section");
sides.id = "sides";
menu?.appendChild(sides);
const drinksHeader = document.createElement("h1");
drinksHeader.innerText = "Drinks";
menu?.appendChild(drinksHeader);
const drinks = document.createElement("section");
drinks.id = "drinks";
menu?.appendChild(drinks);

const sections: {
    [key: number]: HTMLElement;
} = {
    1: burgers,
    2: sides,
    3: drinks,
};

const f = async () => {
    const menuItems = await restaurantApiWrapper.getMenu().catch(noop);
    const cart = await restaurantApiWrapper.getCart().catch(noop);

    if (!menuItems || !cart) {
        const menuFail = document.createElement("p"); // TODO: Implement clear ui
        menuFail.innerText = "Failed to load menu items";
        menu?.appendChild(menuFail);
        return;
    }

    for (const item of menuItems) {
        const cartItem = cart.items.find(cartItem => cartItem.item.id === item.id);

        const parentElement = document.createElement("div");
        const menuItemElement = document.createElement("div");
        menuItemElement.classList.add("item");
        const name = document.createElement("h2");
        name.innerText = item.name;
        menuItemElement.appendChild(name);
        const description = document.createElement("p");
        description.innerText = item.description;
        menuItemElement.appendChild(description);
        const price = document.createElement("pprice");
        price.innerText = item.price + " €";
        menuItemElement.appendChild(price);

        parentElement.appendChild(menuItemElement);

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        const minusButton = document.createElement("button");
        const minusimage = document.createElement("img");
        minusimage.classList.add("minusButtons");
        minusimage.src = "../public/media/svg/minus.svg";
        minusimage.alt = "minus";
        minusButton.appendChild(minusimage);
        buttons.appendChild(minusButton);
        buttons.appendChild(minusButton);
        const input = document.createElement("input");
        input.type = "text";
        input.value = cartItem ? cartItem.quantity.toString() : "0";
        input.maxLength = 2;
        input.size = 2;
        input.readOnly = true;
        buttons.appendChild(input);
        const plusButton = document.createElement("button");
        const plusimage = document.createElement("img");
        plusimage.classList.add("plusButtons");
        plusimage.src = "../public/media/svg/plus.svg";
        plusimage.alt = "plus";
        plusButton.appendChild(plusimage);
        buttons.appendChild(plusButton);

        plusButton.addEventListener("click", async () => {
            const cart = await restaurantApiWrapper.postCartItem(item).catch(noop);
            if (!cart) return;
            increase(input);
            updateCartDialog(cart);
        });

        minusButton.addEventListener("click", async () => {
            if (input.value === "0") return;
            const cart = await restaurantApiWrapper.deleteCartItem(item.id).catch(noop);
            if (!cart) return;
            decrease(input);
            updateCartDialog(cart);
        });

        parentElement.appendChild(buttons);

        sections[item.category].appendChild(parentElement);
    }
};

f();
