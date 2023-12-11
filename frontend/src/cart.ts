import RestaurantApiWrapper from "./api";
import { openDialog } from "./util/dialog";

const restaurantApiWrapper = new RestaurantApiWrapper();

const f = async () => {
    const cart = await restaurantApiWrapper.getCart();

    const itemCount = document.getElementById("itemcounttext");
    if (itemCount)
        itemCount.innerText = cart.items.reduce((acc, item) => acc + item.quantity, 0) + " items";

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
            if (itemCount)
                itemCount.innerText =
                    cart.items.reduce((acc, item) => acc + item.quantity, 0) + " items";
            const updatedItem = updatedCart.items.find(
                cartItem => cartItem.item.id === item.item.id
            );
            if (!updatedItem) return;
            if (updatedItem.quantity === 0) {
                itemElement.remove();
            }
            (+item.item.price * item.quantity).toFixed(2) + " €";
            amount.innerText = updatedItem.quantity + " items";
        });
    }

    const total = document.getElementById("totalprice");
    if (total) total.innerText = cart.total.toFixed(2) + " €";

    const checkoutButton = document.getElementById("checkout");
    checkoutButton?.addEventListener("click", async () => {
        const dialog = document.getElementsByClassName("cardDialog");
        openDialog(dialog[0] as HTMLDialogElement);
        const { publishableKey } = await fetch("/stripe-config").then(r => r.json());
        if (!publishableKey) {
            alert("No publishable key returned from the server. Please check `.env` and try again");
            alert("Please set your Stripe publishable API key in the .env file");
        }

        // @ts-ignore
        const stripe = Stripe(publishableKey, {
            apiVersion: "2023-10-16",
        });

        const elements = stripe.elements();
        const card = elements.create("card");
        card.mount("#card-element");

        // When the form is submitted...
        const form = document.getElementById("payment-form");
        if (!form) return;
        let submitted = false;
        form.addEventListener("submit", async e => {
            e.preventDefault();

            // Disable double submission of the form
            if (submitted) {
                return;
            }
            submitted = true;
            const button = form.querySelector("button");
            if (!button) return;
            button.disabled = true;

            // Make a call to the server to create a new
            // payment intent and store its client_secret.
            const { error: backendError, clientSecret } = await fetch("/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currency: "usd",
                    paymentMethodType: "card",
                }),
            }).then(r => r.json());

            if (backendError) {
                alert(backendError.message);

                // reenable the form.
                submitted = false;
                button.disabled = false;
                return;
            }

            alert(`Client secret returned.`);

            const nameInput = document.querySelector("#name") as HTMLInputElement;
            if (!nameInput) return;

            // Confirm the card payment given the clientSecret
            // from the payment intent that was just created on
            // the server.
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
                alert(stripeError.message);

                // reenable the form.
                submitted = false;
                button.disabled = false;
                return;
            }

            alert(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
        });
    });
};

f();
