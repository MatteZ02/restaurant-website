import RestaurantApiWrapper from "./api";

const restaurantApiWrapper = new RestaurantApiWrapper();

/* example elemet
<div id="items">
  <div class="itemcart">
    <p class="addeditem">item 1</p>
    <p class="addeditemprice">1 €</p>
    <p class="addeditemamount">1 kpl</p>
    <button><img class="deleteitem" src="../public/media/svg/Delete-button.svg" alt="deleteitem"></button>
  </div>
  */

const f = async () => {
    const cart = await restaurantApiWrapper.getCart();

    const items = document.getElementById("items");

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
        amount.innerText = item.quantity + " kpl";
        itemElement.appendChild(amount);
        const deleteButton = document.createElement("button");
        const deleteImage = document.createElement("img");
        deleteImage.classList.add("deleteitem");
        deleteImage.src = "../public/media/svg/Delete-button.svg";
        deleteImage.alt = "deleteitem";
        deleteButton.appendChild(deleteImage);
        itemElement.appendChild(deleteButton);
        items?.appendChild(itemElement);

        deleteButton.addEventListener("click", async () => {
            const updatedCart = await restaurantApiWrapper.deleteCartItem(item.item.id);
            const updatedItem = updatedCart.items.find(
                cartItem => cartItem.item.id === item.item.id
            );
            if (!updatedItem) return;
            if (updatedItem?.quantity === 0) {
                itemElement.remove();
            }
            (+item.item.price * item.quantity).toFixed(2) + " €";
            amount.innerText = updatedItem.quantity + " kpl";
        });
    }

    const total = document.getElementById("totalprice");
    if (total) total.innerText = cart.total.toFixed(2) + " €";
};

f();
