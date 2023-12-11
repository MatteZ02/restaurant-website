import RestaurantApiWrapper from "./api";
import menuItemModalController from "./controllers/menuItemModalController";
import userModifyModalController from "./controllers/userModifyModalController";

enum OrderStatus {
    Pending = 1,
    Accepted = 2,
    Rejected = 3,
    Delivered = 4,
}

const restaurantApiWrapper = new RestaurantApiWrapper();
const redir = `/?login=true&redirect=${window.location.href}`;
const token = localStorage.getItem("token");

const deleteMenuItem = async (id: string) => {
    const res = await restaurantApiWrapper.deleteMenuItem(+id);
    if (!res) {
        alert("Failed to delete menu item");
        return;
    } else {
        alert("Successfully deleted menu item");
        window.location.reload();
    }
};

const getOrderStatus = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Accepted:
            return "Accepted";
        case OrderStatus.Delivered:
            return "Delivered";
        case OrderStatus.Pending:
            return "Pending";
        case OrderStatus.Rejected:
            return "Rejected";
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

    const menuItems = await restaurantApiWrapper.getMenu();

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

        const user = await restaurantApiWrapper.getUser(+searchUserInput.value);

        if (!user) return alert("User not found");
        if (!userModal) return console.log("User modal not found");
        userModifyModalController(userModal as HTMLDialogElement, user);
    });

    const orders = await restaurantApiWrapper.getOrders();
    const ordersElement = document.querySelector("#orders");
    for (const order of orders.filter(
        order => order.order_status === (OrderStatus.Pending || OrderStatus.Accepted)
    )) {
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
            const res = await restaurantApiWrapper.patchOrder(order.id, {
                order_status: OrderStatus.Accepted,
            });
            if (!res) return alert("Failed to accept order");
            alert("Successfully accepted order");
            window.location.reload();
        });

        const deliveredButton = document.createElement("button");
        deliveredButton.classList.add("nappi");
        deliveredButton.classList.add("nappi2");
        deliveredButton.innerText = "Delivered";
        deliveredButton.addEventListener("click", async () => {
            const res = await restaurantApiWrapper.patchOrder(order.id, {
                order_status: OrderStatus.Delivered,
            });
            if (!res) return alert("Failed to deliver order");
            alert("Successfully delivered order");
            window.location.reload();
        });

        const rejectButton = document.createElement("button");
        rejectButton.classList.add("nappi");
        rejectButton.classList.add("nappi3");
        rejectButton.innerText = "Reject";
        rejectButton.addEventListener("click", async () => {
            const res = await restaurantApiWrapper.patchOrder(order.id, {
                order_status: OrderStatus.Rejected,
            });
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

        ordersElement?.appendChild(orderElement);
    }
})();
