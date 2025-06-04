// server.js

// 1) Load environment variables from .env
require('dotenv').config();

const express = require('express');
const Stripe = require('stripe');
const path = require('path');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// 2) Middleware: allow JSON in request bodies
app.use(express.json());

// 3) If you also want to serve static files (e.g., your HTML/JS/CSS) from this folder,
//    you can uncomment the next line. Otherwise, skip this if your front-end is served elsewhere.
// app.use(express.static(path.join(__dirname, 'public')));

// 4) POST /create-checkout-session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { lineItems } = req.body;

    // 4a) Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // Replace these URLs with wherever you want to redirect on success/cancel:
      success_url: 'https://www.beaverbuiltfurniture.com/success.html',
      cancel_url: 'https://www.beaverbuiltfurniture.com/canceled.html',
    });

    // 4b) Send the session ID back to the front-end
    res.json({ id: session.id });
  } catch (err) {
    console.error('Error creating Checkout Session:', err);
    res.status(500).json({ error: err.message });
  }
});

// 5) Start the server on the port from .env (default 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
