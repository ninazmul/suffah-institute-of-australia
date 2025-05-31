import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  createdAt: Date;
  totalAmount: string;
  adults: string;
  kids: string;
  infants: string;
  buyerName: string;
  buyerEmail: string;
  buyerNumber: string;
  note: string;
  event: {
    _id: string;
    title: string;
  };
}

export type IOrderItem = {
  _id: string;
  totalAmount: string;
  adults: string;
  kids: string;
  infants: string;
  buyerName: string;
  buyerEmail: string;
  buyerNumber: string;
  note: string;
  createdAt: Date;
  eventTitle: string;
  eventId: string;
};

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: String,
  },
  adults: {
    type: String,
  },
  kids: {
    type: String,
  },
  infants: {
    type: String,
  },
  buyerName: {
    type: String,
  },
  buyerEmail: {
    type: String,
  },
  buyerNumber: {
    type: String,
  },
  note: {
    type: String,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
