import RestaurantApiWrapper from "./api";

const restaurantApiWrapper = new RestaurantApiWrapper();

const params = new URLSearchParams(window.location.search);

async () => {
    const menuItems = await restaurantApiWrapper.getMenu();
    for (const item of menuItems) {
        // TODO: display menu items
    }
};
