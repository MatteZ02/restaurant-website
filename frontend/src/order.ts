import RestaurantApiWrapper from "./api";
import getOrderStatus from "./util/getOrderStatus";

const restaurantApiWrapper = new RestaurantApiWrapper();
const f = async () => {
    const orderId = window.location.pathname.split("/")[2];
    if (!orderId) return window.location.replace("/");
    const order = await restaurantApiWrapper.getOrderById(+orderId);
    if (!order) return window.location.replace("/");
    const confirmationHeader = document.getElementById("order-confirmation");
    if (confirmationHeader)
        confirmationHeader.innerText = `Order status: ${getOrderStatus(order.order_status)}`;
};

f();
