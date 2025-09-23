import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { amount, userId } = req.body;

    try {
      // Create a new Stripe Checkout session for the donation
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "aud", // You can change the currency if necessary
              product_data: {
                name: "Donation", // You can customize the product name
              },
              unit_amount: amount * 100, // Amount is in cents (e.g., $10 = 1000 cents)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/thank-you?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate?canceled=true`,
        metadata: {
          userId, // Store userId in metadata for tracking the donation
        },
      });

      // Respond with the session ID to the frontend
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
