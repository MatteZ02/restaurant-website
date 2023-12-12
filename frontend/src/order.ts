import { Order } from "restaurantApiTypes";
import RestaurantApiWrapper from "./api";
import getOrderStatus from "./util/getOrderStatus";
import { noop } from "./util/utils";
import config from "./config";

const restaurantApiWrapper = new RestaurantApiWrapper();
const f = async () => {
    const orderId = window.location.pathname.split("/")[2];
    if (!orderId) return window.location.replace("/");
    const order = await restaurantApiWrapper.getOrderById(+orderId).catch(noop);
    if (!order) return window.location.replace("/");
    const confirmationHeader = document.getElementById("order-confirmation");
    if (confirmationHeader)
        confirmationHeader.innerText = `Order status: ${getOrderStatus(order.order_status)}`;

    const socket = new WebSocket(config.socketUrl);
    socket.onopen = () => {
        socket.send(JSON.stringify({ orderId }));
    };

    socket.onmessage = (event: MessageEvent) => {
        const order: Order | Partial<Order> = JSON.parse(event.data);
        if (confirmationHeader && order.order_status)
            confirmationHeader.innerText = `Order status: ${getOrderStatus(order.order_status)}`;
    };
};

f();
