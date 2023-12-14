import { noop } from "../util/utils";

const createPaymentIntent = async () => {
    const res = await fetch("/create-payment-intent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            currency: "eur",
            paymentMethodType: "card",
        }),
    }).catch(noop);
    if (!res) return;
    const json = await res.json().catch(noop);
    return json;
};

export default createPaymentIntent;
