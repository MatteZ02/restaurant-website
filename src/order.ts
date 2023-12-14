import { Order } from "restaurantApiTypes";
import RestaurantApiWrapper from "./api";
import { noop } from "./util/utils";
import config from "./config";

const orderStatusToText = (status: number) => {
    switch (status) {
        case 1:
            return "Your order is awaiting confirmation";
        case 2:
            return "Your has been accepted by the restaurant";
        case 3:
            return "Your order as been delivered";
        case 4:
            return "Your order has been rejected. Please contact the restaurant if you believe this is a mistake";
    }
};

const restaurantApiWrapper = new RestaurantApiWrapper();
const f = async () => {
    const orderId = window.location.pathname.split("/")[2];
    if (!orderId) return window.location.replace("/");
    const order = await restaurantApiWrapper.getOrderById(+orderId).catch(noop);
    if (!order) return window.location.replace("/");
    const confirmation = document.getElementById("order-confirmation");
    if (confirmation)
        confirmation.innerText = orderStatusToText(order.order_status) ?? "Unknown status";
    const orderNumber = document.getElementById("order_id");
    if (orderNumber) orderNumber.innerText = `#${order.id}`;
    const socket = new WebSocket(config.socketUrl);
    socket.onopen = () => {
        socket.send(JSON.stringify({ orderId }));
    };

    socket.onmessage = (event: MessageEvent) => {
        const order: Order | Partial<Order> = JSON.parse(event.data);
        if (confirmation && order.order_status)
            confirmation.innerText = orderStatusToText(order.order_status) ?? "Unknown status";
    };

    const cart = await restaurantApiWrapper.getCart().catch(noop);
    if (!cart) return;

    const itemCount = document.getElementById("itemcounttext");
    if (itemCount)
        itemCount.innerText = cart.items.reduce((acc, item) => acc + item.quantity, 0) + " items";

    const items = document.getElementById("order-items");

    for (const item of cart.items) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("itemcart");
        const name = document.createElement("div");
        name.classList.add("addeditem");
        name.innerText = item.item.name;
        itemElement.appendChild(name);
        const price = document.createElement("div");
        price.classList.add("addeditemprice");
        price.innerText = (+item.item.price * item.quantity).toFixed(2) + " €";
        itemElement.appendChild(price);
        const amount = document.createElement("div");
        amount.classList.add("addeditemamount");
        amount.innerText = item.quantity + " items";
        itemElement.appendChild(amount);
        items?.appendChild(itemElement);
    }
};

f();
