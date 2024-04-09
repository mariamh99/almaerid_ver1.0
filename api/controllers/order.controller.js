import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Listing from "../models/listing.model.js";
import Stripe from "stripe";
export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const listing = await Listing.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: listing.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    listingId: listing._id,
    img: listing.cover,
    title: listing.title,
    buyerId: req.userId,
    sellerId: listing.userId,
    price: listing.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};