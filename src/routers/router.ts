import { Response, Router } from "express";
import Request from "../types/Request";
import config from "../config";
import Stripe from "stripe";
import { stripe } from "..";
import bodyParser from "body-parser";

const router = Router();

router.get("/stripe-config", (_: Request, res: Response): void => {
    res.send({
        publishableKey: config.stripe_pubhlishable_key,
    });
});

router.post("/create-payment-intent", async (req: Request, res: Response): Promise<void> => {
    const {
        currency,
        paymentMethodType,
        paymentMethodOptions,
    }: { currency: string; paymentMethodType: string; paymentMethodOptions?: object } = req.body;
    // Create a PaymentIntent with the order amount and currency.
    const params: Stripe.PaymentIntentCreateParams = {
        amount: 5999,
        currency,
        // Each payment method type has support for different currencies. In order to
        // support many payment method types and several currencies, this server
        // endpoint accepts both the payment method type and the currency as
        // parameters. To get compatible payment method types, pass
        // `automatic_payment_methods[enabled]=true` and enable types in your dashboard
        // at https://dashboard.stripe.com/settings/payment_methods.
        //
        // Some example payment method types include `card`, `ideal`, and `link`.
        payment_method_types: paymentMethodType === "link" ? ["link", "card"] : [paymentMethodType],
    };

    // If this is for an ACSS payment, we add payment_method_options to create
    // the Mandate.
    if (paymentMethodType === "acss_debit") {
        params.payment_method_options = {
            acss_debit: {
                mandate_options: {
                    payment_schedule: "sporadic",
                    transaction_type: "personal",
                },
            },
        };
    } else if (paymentMethodType === "customer_balance") {
        params.payment_method_data = {
            type: "customer_balance",
        } as any;
        params.confirm = true;
        params.customer =
            req.body.customerId || (await stripe.customers.create().then(data => data.id));
    }

    /**
     * If API given this data, we can overwride it
     */
    if (paymentMethodOptions) {
        params.payment_method_options = paymentMethodOptions;
    }

    try {
        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params);

        // Send publishable key and PaymentIntent client_secret to client.
        res.send({
            clientSecret: paymentIntent.client_secret,
            nextAction: paymentIntent.next_action,
        });
    } catch (e: any) {
        res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

router.get("/payment/next", async (req, res) => {
    const paymentIntent: any = req.query.payment_intent;
    const intent = await stripe.paymentIntents.retrieve(paymentIntent, {
        expand: ["payment_method"],
    });

    res.redirect(`/success?payment_intent_client_secret=${intent.client_secret}`);
});

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard:
// https://dashboard.stripe.com/test/webhooks
router.post(
    "/webhook",
    // Use body-parser to retrieve the raw body as a buffer.
    bodyParser.raw({ type: "application/json" }),
    async (req: Request, res: Response): Promise<void> => {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event: Stripe.Event;

        const headers = req.headers["stripe-signature"];
        if (!headers) {
            console.log(`⚠️  Webhook signature verification failed.`);
            res.sendStatus(400);
            return;
        }

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                headers,
                config.stripe_webhook_secret as string
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            res.sendStatus(400);
            return;
        }

        // Extract the data from the event.
        const data: Stripe.Event.Data = event.data;
        const eventType: string = event.type;

        if (eventType === "payment_intent.succeeded") {
            // Cast the event into a PaymentIntent to make use of the types.
            const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent;
            // Funds have been captured
            // Fulfill any orders, e-mail receipts, etc
            // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
            console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
            console.log("💰 Payment captured!");
        } else if (eventType === "payment_intent.payment_failed") {
            // Cast the event into a PaymentIntent to make use of the types.
            const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent;
            console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
            console.log("❌ Payment failed.");
        }
        res.sendStatus(200);
    }
);

export default router;
