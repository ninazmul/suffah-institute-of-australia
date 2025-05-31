/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { connectToDatabase } from "../database";
import { ObjectId } from "mongodb";
import { handleError } from "../utils";
import FreeOrder from "../database/models/freeorder.model";

export type CreateFreeOrderParams = {
  name: string;
  address: string;
  number: string;
  email: string;
  timezone: string;
  media: string;
  group: string;
  eventId: string;
  eventTitle: string;
};

export type GetFreeOrdersByEventParams = {
  searchString?: string;
  eventId: string;
};

// CREATE FREE ORDER
export const createFreeOrder = async (params: CreateFreeOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await FreeOrder.create({
      name: params.name,
      address: params.address,
      number: params.number,
      email: params.email,
      timezone: params.timezone,
      media: params.media,
      group:params.group,
      event: {
        _id: params.eventId, 
        title: params.eventTitle,
      },
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// GET ALL FREE ORDERS
export const getAllFreeOrders = async () => {
  try {
    await connectToDatabase();

    const freeOrders = await FreeOrder.find({});

    return JSON.parse(JSON.stringify(freeOrders));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// GET FREE ORDERS BY EVENT
export const getFreeOrdersByEvent = async ({
  searchString,
  eventId,
}: GetFreeOrdersByEventParams) => {
  try {
    await connectToDatabase();

    if (!eventId) throw new Error("Event ID is required");

    const query: any = { "event._id": new ObjectId(eventId) };

    if (searchString) {
      query.$or = [
        { name: { $regex: searchString, $options: "i" } },
        { address: { $regex: searchString, $options: "i" } },
        { email: { $regex: searchString, $options: "i" } },
      ];
    }

    const freeOrders = await FreeOrder.find(query);

    return JSON.parse(JSON.stringify(freeOrders));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// DELETE FREE ORDER
export const deleteFreeOrder = async (freeOrderId: string) => {
  try {
    await connectToDatabase();

    if (!freeOrderId) throw new Error("FreeOrder ID is required");

    const deletedOrder = await FreeOrder.findByIdAndDelete(freeOrderId);

    if (!deletedOrder) throw new Error("FreeOrder not found");

    return { message: "FreeOrder successfully deleted" };
  } catch (error) {
    handleError(error);
    throw error;
  }
};
