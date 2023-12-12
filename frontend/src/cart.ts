import RestaurantApiWrapper from "./api";
import createPaymentIntent from "./functions/createPaymentIntent";
import { openDialog } from "./util/dialog";
import { noop } from "./util/utils";

const restaurantApiWrapper = new RestaurantApiWrapper();

const f = async () => {
    const cart = await restaurantApiWrapper.getCart().catch(noop);
    if (!cart) return;

    const itemCount = document.getElementById("itemcounttext");
    if (itemCount)
        itemCount.innerText = cart.items.reduce((acc, item) => acc + item.quantity, 0) + " items";

    const items = document.getElementById("items");
    const total = document.getElementById("totalprice");

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
        amount.innerText = item.quantity + " items";
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
            if (total) total.innerText = updatedCart.total.toFixed(2) + " €";
            if (itemCount)
                itemCount.innerText =
                    updatedCart.items.reduce((acc, item) => acc + item.quantity, 0) + " items";
            const updatedItem = updatedCart.items.find(
                cartItem => cartItem.item.id === item.item.id
            );
            if (!updatedItem) return itemElement.remove();
            (+updatedItem.item.price * updatedItem.quantity).toFixed(2) + " €";
            price.innerText = (+updatedItem.item.price * updatedItem.quantity).toFixed(2) + " €";
            amount.innerText = updatedItem.quantity + " items";
        });
    }

    if (total) total.innerText = cart.total.toFixed(2) + " €";

    const checkoutButton = document.getElementById("checkout");
    checkoutButton?.addEventListener("click", async () => {
        if (cart.items.length === 0) return alert("Your cart is empty!");

        const dialog = document.getElementsByClassName("cardDialog");
        openDialog(dialog[0] as HTMLDialogElement);
        const { publishableKey } = await fetch("/stripe-config").then(r => r.json());
        if (!publishableKey) console.log("Error: Missing Stripe publishable key");

        // @ts-ignore
        const stripe = Stripe(publishableKey, {
            apiVersion: "2023-10-16",
        });

        const elements = stripe.elements();
        const card = elements.create("card");
        card.mount("#card-element");

        const form = document.getElementById("payment-form");
        if (!form) return;
        let submitted = false;
        form.addEventListener("submit", async e => {
            e.preventDefault();

            if (submitted) return;
            submitted = true;
            const button = form.querySelector("button");
            if (!button) return;
            button.disabled = true;

            const payment = await createPaymentIntent();
            if (!payment) return console.log("Error: Failed to create payment intent"); // TODO: Proper error display
            const { error: backendError, clientSecret } = payment;

            if (backendError) {
                console.log(backendError.message);
                submitted = false;
                button.disabled = false;
                return;
            }

            const nameInput = document.querySelector("#name") as HTMLInputElement;
            if (!nameInput) return;

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: nameInput.value,
                        },
                    },
                }
            );

            if (stripeError) {
                console.log(stripeError.message);
                submitted = false;
                button.disabled = false;
                return;
            }

            console.log(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
            window.location.href = "/success/";
        });
    });
};

f();
