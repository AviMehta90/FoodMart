import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51JoWJrSCEnOeXCnonSUvArYcjUAsaALfLRxEe9G5pwu1JgDJp9DyHcNxt5LBdXcwkgl74ocRnu9mXWrFQWQVb7R80059Kh9LTv";
const SECRET_KEY = "sk_test_51JoWJrSCEnOeXCno70KZMN91vf1Nbc5gF3p4eVsTRlu5RNeWm62G9uh8k5v7XT6WDdV2Qn7TKuS8yuXmtq0HY9k300ronj2HsO";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "inr",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
