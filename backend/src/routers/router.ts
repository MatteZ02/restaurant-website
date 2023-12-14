import { NextFunction, Response, Router } from "express";
import Request from "../types/Request";
import config from "../config";
import Stripe from "stripe";
import { debug, stripe } from "..";
import bodyParser from "body-parser";
import requestHandler from "../util/requestHandler";
import { Order } from "restaurantApiTypes";

const router = Router();

router.get("/stripe-config", (_: Request, res: Response): void => {
    debug.log("get /stripe-config");
    res.send({
        publishableKey: config.stripe_pubhlishable_key,
    });
});

router.post("/create-payment-intent", async (req: Request, res: Response): Promise<void> => {
    debug.log("post /create-payment-intent");
    const {
        currency,
        paymentMethodType,
        paymentMethodOptions,
    }: { currency: string; paymentMethodType: string; paymentMethodOptions?: object } = req.body;
    if (!req.session.cart) {
        res.status(400).send({ error: { message: "No cart found" } });
        return;
    }
    const params: Stripe.PaymentIntentCreateParams = {
        amount:
            +req.session.cart
                .reduce((acc, item) => acc + +item.item.price * item.quantity, 0)
                .toFixed(2) * 100,
        currency,
        payment_method_types: paymentMethodType === "link" ? ["link", "card"] : [paymentMethodType],
    };

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

    if (paymentMethodOptions) {
        params.payment_method_options = paymentMethodOptions;
    }

    try {
        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params);

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
    debug.log("get /payment/next");
    const paymentIntent: any = req.query.payment_intent;
    const intent = await stripe.paymentIntents.retrieve(paymentIntent, {
        expand: ["payment_method"],
    });

    res.redirect(`/success?payment_intent_client_secret=${intent.client_secret}`);
});

router.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    async (req: Request, res: Response): Promise<void> => {
        debug.log("post /webhook");
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

        const data: Stripe.Event.Data = event.data;
        const eventType: string = event.type;

        if (eventType === "payment_intent.succeeded") {
            const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent;
            console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
            console.log("💰 Payment captured!");
        } else if (eventType === "payment_intent.payment_failed") {
            const pi: Stripe.PaymentIntent = data.object as Stripe.PaymentIntent;
            console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
            console.log("❌ Payment failed.");
        }
        res.sendStatus(200);
    }
);

router.get("/success", async (req: Request, res: Response, next: NextFunction) => {
    debug.log("get /success");
    const { payment_intent_client_secret } = req.query;
    const cart = req.session.cart;
    if (!cart) return res.redirect("/cart/");
    const order = {
        user: req.user?.id ?? 1,
        items: cart.map(item => ({ item: item.item.id, quantity: item.quantity })),
        order_status: 1,
    };

    const o = await requestHandler.post<Order>("order", order, {
        "Content-type": "application/json",
    });
    if (!o) return res.redirect("/cart/");
    res.redirect(`/order/${o.id}`);
});

export default router;
