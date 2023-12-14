import { MenuItem, Order } from "restaurantApiTypes";
import getOrderStatus, { OrderStatus } from "../util/getOrderStatus";
import RestaurantApiWrapper from "../api";
import { noop } from "../util/utils";

const restaurantApiWrapper = new RestaurantApiWrapper();

export const orderElement = async (order: Order, menuItems: MenuItem[]) => {
    const orderElement = document.createElement("div");
    orderElement.classList.add("order");

    const orderInfoElement = document.createElement("div");
    orderInfoElement.classList.add("orderinfo");

    const orderIDElement = document.createElement("p");
    orderIDElement.classList.add("orderID");
    orderIDElement.innerText = `Order ${order.id}`;

    const userIDElement = document.createElement("p");
    userIDElement.classList.add("userID");
    userIDElement.innerText = `User ${order.user}`;

    const orderStatusElement = document.createElement("p");
    orderStatusElement.classList.add("orderstatus");
    orderStatusElement.innerText = `Status ${getOrderStatus(order.order_status)}`;

    orderInfoElement.appendChild(orderIDElement);
    orderInfoElement.appendChild(userIDElement);
    orderInfoElement.appendChild(orderStatusElement);

    const orderItemsElement = document.createElement("div");
    orderItemsElement.classList.add("orderitems");

    for (const item of order.items) {
        const menuItem = menuItems.find(menuItem => menuItem.id === item.item);
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        const itemNameElement = document.createElement("p");
        itemNameElement.classList.add("items");
        itemNameElement.innerText = menuItem?.name || "Unknown item";

        const itemQuantityElement = document.createElement("p");
        itemQuantityElement.classList.add("quantity");
        itemQuantityElement.innerText = `${item.quantity} kpl`;

        itemElement.appendChild(itemNameElement);
        itemElement.appendChild(itemQuantityElement);

        orderItemsElement.appendChild(itemElement);
    }

    const orderButtonsElement = document.createElement("div");
    orderButtonsElement.classList.add("orderbuttons");

    const acceptButton = document.createElement("button");
    acceptButton.classList.add("nappi");
    acceptButton.innerText = "Accept";
    acceptButton.addEventListener("click", async () => {
        const res = await restaurantApiWrapper
            .patchOrder(order.id, {
                order_status: OrderStatus.Accepted,
            })
            .catch(noop);
        if (!res) return alert("Failed to accept order");
        alert("Successfully accepted order");
        window.location.reload();
    });

    const deliveredButton = document.createElement("button");
    deliveredButton.classList.add("nappi");
    deliveredButton.classList.add("nappi2");
    deliveredButton.innerText = "Delivered";
    deliveredButton.addEventListener("click", async () => {
        const res = await restaurantApiWrapper
            .patchOrder(order.id, {
                order_status: OrderStatus.Delivered,
            })
            .catch(noop);
        if (!res) return alert("Failed to deliver order");
        alert("Successfully delivered order");
        window.location.reload();
    });

    const rejectButton = document.createElement("button");
    rejectButton.classList.add("nappi");
    rejectButton.classList.add("nappi3");
    rejectButton.innerText = "Reject";
    rejectButton.addEventListener("click", async () => {
        const res = await restaurantApiWrapper
            .patchOrder(order.id, {
                order_status: OrderStatus.Rejected,
            })
            .catch(noop);
        if (!res) return alert("Failed to reject order");
        alert("Successfully rejected order");
        window.location.reload();
    });

    orderButtonsElement.appendChild(acceptButton);
    orderButtonsElement.appendChild(deliveredButton);
    orderButtonsElement.appendChild(rejectButton);

    orderElement.appendChild(orderInfoElement);

    orderElement.appendChild(orderItemsElement);
    orderElement.appendChild(orderButtonsElement);
    return orderElement;
};

export default orderElement;
