import { Order } from "restaurantApiTypes";
import RestaurantApiWrapper from "./api";
import config from "./config";
import menuItemModalController from "./controllers/menuItemModalController";
import userModifyModalController from "./controllers/userModifyModalController";
import orderElement from "./elements/orderElement";
import { noop } from "./util/utils";

const restaurantApiWrapper = new RestaurantApiWrapper();
const redir = `/?login=true&redirect=${window.location.href}`;
const token = localStorage.getItem("token");

const deleteMenuItem = async (id: string) => {
    const res = await restaurantApiWrapper.deleteMenuItem(+id).catch(noop);
    if (!res) {
        alert("Failed to delete menu item");
        return;
    } else {
        alert("Successfully deleted menu item");
        window.location.reload();
    }
};

const menu = document.querySelector("#menu-items");

(async () => {
    if (!token) return (window.location.href = redir);

    const user = await restaurantApiWrapper.getMe(token).catch(() => {
        window.location.href = redir;
    });

    if (!user || user.level > 2) return (window.location.href = redir);

    const menuItemModal = document.querySelector("#menu-item-modal");

    const addMenuItemButton = document.querySelector("#add-menu-item");
    addMenuItemButton?.addEventListener("click", evt => {
        evt.preventDefault();
        menuItemModalController(menuItemModal as HTMLDialogElement);
    });

    const menuItems = await restaurantApiWrapper.getMenu().catch(noop);
    if (!menuItems) {
        const menuFail = document.createElement("p");
        menuFail.innerText = "Failed to load menu items";
        menu?.appendChild(menuFail);
        return;
    }

    for (const item of menuItems) {
        const menuItemElement = document.createElement("div");
        menuItemElement.classList.add("menu-item");
        menuItemElement.id = item.id.toString();

        const menuItemName = document.createElement("h3");
        menuItemName.innerText = item.name;

        const menuItemDescription = document.createElement("p");
        menuItemDescription.innerText = item.description;

        const menuItemPrice = document.createElement("p");
        menuItemPrice.innerText = item.price.toString();

        const menuItemCategory = document.createElement("p");
        menuItemCategory.innerText = item.category.toString();
        menuItemElement.appendChild(menuItemName);
        menuItemElement.appendChild(menuItemDescription);
        menuItemElement.appendChild(menuItemPrice);
        menuItemElement.appendChild(menuItemCategory);

        if (user.level === 1) {
            const menuItemEdit = document.createElement("button");
            menuItemEdit.innerText = "Edit";
            menuItemEdit.addEventListener("click", evt => {
                evt.preventDefault();
                menuItemModalController(menuItemModal as HTMLDialogElement, item);
            });

            const menuItemDelete = document.createElement("button");
            menuItemDelete.innerText = "Delete";
            menuItemDelete.addEventListener("click", () => deleteMenuItem(item.id.toString()));

            menuItemElement.appendChild(menuItemEdit);
            menuItemElement.appendChild(menuItemDelete);
        }

        menu?.appendChild(menuItemElement);
    }

    const searchUserBtn = document.querySelector("#search");
    const searchUserInput = document.querySelector("#search-user") as HTMLInputElement;
    const userModal = document.querySelector("#user-modal");

    searchUserBtn?.addEventListener("click", async evt => {
        evt.preventDefault();

        const user = await restaurantApiWrapper.getUser(+searchUserInput.value).catch(noop);

        if (!user) return alert("User not found");
        if (!userModal) return console.log("User modal not found");
        userModifyModalController(userModal as HTMLDialogElement, user);
    });

    const orders = await restaurantApiWrapper.getOrders().catch(noop);
    const ordersElement = document.querySelector("#orders");
    if (!orders) {
        const ordersFail = document.createElement("p");
        ordersFail.innerText = "Failed to load orders";
        ordersElement?.appendChild(ordersFail);
        return;
    }

    for (const order of orders.filter(order => order.order_status < 3)) {
        const element = await orderElement(order, menuItems);
        ordersElement?.appendChild(element);
    }

    const socket = new WebSocket(config.socketUrl);
    socket.onopen = () => {
        socket.send(JSON.stringify({ type: "staff" }));
    };

    socket.onmessage = async msg => {
        const data: Order = JSON.parse(msg.data.toString());
        const element = await orderElement(data, menuItems);
        ordersElement?.append(element);
    };
})();
