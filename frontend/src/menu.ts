import RestaurantApiWrapper from "./api";

const restaurantApiWrapper = new RestaurantApiWrapper();


async () => {
    const menuItems = await restaurantApiWrapper.getMenu();
    console.log(menuItems);
    for (const item in menuItems) {
        const menuItem = menuItems[item];

        const menuItemElement = document.createElement("div");
        menuItemElement.classList.add("menu-item");
        menuItemElement.id = menuItem.id.toString();

        const menuItemName = document.createElement("h3");
        menuItemName.innerText = menuItem.name;

        const menuItemDescription = document.createElement("p");
        menuItemDescription.innerText = menuItem.description;

        const menuItemPrice = document.createElement("p");
        menuItemPrice.innerText = menuItem.price.toString();

        const menuItemCategory = document.createElement("p");
        menuItemCategory.innerText = menuItem.category.toString();
    }
};
