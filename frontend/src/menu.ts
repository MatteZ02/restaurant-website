import RestaurantApiWrapper from "./api";

const restaurantApiWrapper = new RestaurantApiWrapper();

const params = new URLSearchParams(window.location.search);

async () => {
    const menu = await restaurantApiWrapper.getMenu();
    for (const item of menu) {
        // TODO: display menu items
    }
};
