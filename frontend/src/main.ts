import RestaurantApiWrapper from "./api";

const restaurantApiWrapper = new RestaurantApiWrapper();

const params = new URLSearchParams(window.location.search);
const login = params.get("login");
const redirect = params.get("redirect");

if (login) {
}
