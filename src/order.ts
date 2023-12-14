import { Order } from "restaurantApiTypes";
import RestaurantApiWrapper from "./api";
import { noop } from "./util/utils";
import config from "./config";

const orderStatusToText = (status: number) => {
    switch (status) {
        case 1:
            return "Your order is awaiting confirmation";
        case 2:
            return "Your order has been accepted by the restaurant";
        case 4:
            return "Your order has been delivered";
        case 3:
            return "Your order has been rejected. Please contact the restaurant if you believe this is a mistake";
    }
};

const restaurantApiWrapper = new RestaurantApiWrapper();
const f = async () => {
    const orderId = window.location.pathname.split("/")[2];
    if (!orderId) return window.location.replace("/");
    const order = await restaurantApiWrapper.getOrderById(+orderId).catch(noop);
    if (!order) return window.location.replace("/");
    const confirmation = document.getElementById("order-status");
    if (confirmation)
        confirmation.innerText = orderStatusToText(order.order_status) ?? "Unknown status";
    const orderNumber = document.getElementById("order_id");
    if (orderNumber) orderNumber.innerText = `Order #${order.id}`;
    const socket = new WebSocket(config.socketUrl);
    socket.onopen = () => {
        socket.send(JSON.stringify({ orderId }));
    };

    socket.onmessage = (event: MessageEvent) => {
        const order: Order | Partial<Order> = JSON.parse(event.data);
        if (confirmation && order.order_status)
            confirmation.innerText = orderStatusToText(order.order_status) ?? "Unknown status";
    };

    const orderItems = document.getElementById("order-items");
    if (!orderItems) return;
    const menu = await restaurantApiWrapper.getMenu().catch(noop);
    if (!menu) return;

    for (const orderItem of order.items) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("itemcart");
        const name = document.createElement("div");
        name.classList.add("addeditem");
        name.innerText = menu.find(menuItem => menuItem.id === orderItem.item)?.name ?? "Unknown";
        itemElement.appendChild(name);
        const price = document.createElement("div");
        price.classList.add("addeditemprice");
        price.innerText = menu.find(menuItem => menuItem.id === orderItem.item)?.price ?? "Unknown";
        itemElement.appendChild(price);
        const amount = document.createElement("div");
        amount.classList.add("addeditemamount");
        amount.innerText = orderItem.quantity + " items";
        itemElement.appendChild(amount);
        orderItems?.appendChild(itemElement);
    }
};

f();
