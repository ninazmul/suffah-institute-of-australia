import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || "",
      buyerName: metadata?.buyerName || "",
      buyerEmail: metadata?.buyerEmail || "",
      buyerNumber: metadata?.buyerNumber || "",
      adults: metadata?.adults ? parseInt(metadata.adults, 10) : 0,
      kids: metadata?.kids ? parseInt(metadata.kids, 10) : 0,
      infants: metadata?.infants ? parseInt(metadata.infants, 10) : 0,
      note: metadata?.note || "",
      totalAmount: amount_total ? amount_total / 100 : 0,
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);
    return NextResponse.json(
      { message: "Order created successfully", order: newOrder },
      { status: 200 }
    );
  }

  return new Response("", { status: 200 });
}
