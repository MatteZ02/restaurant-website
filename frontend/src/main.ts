import RestaurantApiWrapper from "./api";

const restaurantApiWrapper = new RestaurantApiWrapper();

async () => {
    const menu = await restaurantApiWrapper.getMenu();
    for (const item of menu) {
        // TODO: display menu items
    }
};
