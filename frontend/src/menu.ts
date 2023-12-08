import RestaurantApiWrapper from "./api";
import Cart from "./classes/cart";
import { decrease, increase } from "./functions/counter";

const restaurantApiWrapper = new RestaurantApiWrapper();
const cart = new Cart();

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
    const menuItems = await restaurantApiWrapper.getMenu();

    for (const item of menuItems) {
        const parentElement = document.createElement("div");
        const menuItemElement = document.createElement("div");
        menuItemElement.classList.add("item");
        const name = document.createElement("h2");
        name.innerText = item.name;
        menuItemElement.appendChild(name);
        const description = document.createElement("p");
        description.innerText = item.description;
        menuItemElement.appendChild(description);
        const price = document.createElement("p");
        price.innerText = item.price.toString() + " €";
        menuItemElement.appendChild(price);

        parentElement.appendChild(menuItemElement);

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        const minusButton = document.createElement("button");
        minusButton.innerText = "-";
        buttons.appendChild(minusButton);
        const input = document.createElement("input");
        input.type = "text";
        input.value = "0";
        input.maxLength = 2;
        input.size = 2;
        input.readOnly = true;
        buttons.appendChild(input);
        const plusButton = document.createElement("button");
        plusButton.innerText = "+";
        buttons.appendChild(plusButton);

        plusButton.addEventListener("click", () => {
            cart.add(item);
            increase(input);
        });

        minusButton.addEventListener("click", () => {
            cart.remove(item);
            decrease(input);
        });

        parentElement.appendChild(buttons);

        sections[item.category].appendChild(parentElement);
    }
};

f();
