/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// import Stripe from "stripe";
import {
  CreateOrderParams,
  getOrdersByEmailParams,
} from "@/types";
// import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";

// export const checkoutOrder = async (order: CheckoutOrderParams) => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//   const price = order.isFree ? 0 : Number(order.price) * 100;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "aud",
//             unit_amount: price,
//             product_data: {
//               name: order.eventTitle,
//             },
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//         eventId: order.eventId,
//         buyerName: order.buyerName,
//         buyerEmail: order.buyerEmail,
//         buyerNumber: order.buyerNumber,
//         adults: order.adults.toString(),
//         kids: order.kids.toString(),
//         infants: order.infants.toString(),
//         note: order.note || "",
//       },
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
//       cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
//     });

//     redirect(session.url!);
//   } catch (error) {
//     throw error;
//   }
// };

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

export const getAllOrders = async () => {
  try {
    await connectToDatabase();

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyerName: 1,
          buyerEmail: 1,
          buyerNumber: 1,
          adults: 1,
          kids: 1,
          infants: 1,
          note: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
};

// GET ORDERS BY USER
export async function getOrdersByEmail({
  email,
  limit = 3,
  page,
}: getOrdersByEmailParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyerEmail: email }; // Match user email with buyerEmail

    // Fetch orders with conditions and pagination
    const orders = await Order.find(conditions)
      .sort({ createdAt: -1 }) // Sort by descending creation date
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });

    // Count total orders for the provided email
    const ordersCount = await Order.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error); // Handle error with your custom error handler
  }
}

// DELETE ORDER
export const deleteOrder = async (orderId: any) => {
  try {
    await connectToDatabase();

    if (!orderId) throw new Error("Order ID is required");

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) throw new Error("Order not found");

    return { message: "Order successfully deleted" };
  } catch (error) {
    handleError(error);
  }
};
