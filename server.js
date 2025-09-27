// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Donation',
            },
            unit_amount: amount * 100, // convert pounds to pence
          },
          quantity: 1,
        },
      ],
      // ✅ Update these with your actual Netlify domain
      success_url: 'https://YOUR-NETLIFY-SITE.netlify.app/success.html',
      cancel_url: 'https://YOUR-NETLIFY-SITE.netlify.app/cancel.html',
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// ✅ Use Render's assigned port or fallback to 4242 locally
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
