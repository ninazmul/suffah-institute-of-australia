import { Schema, model, models, Document, Types } from "mongoose";

export interface IFreeOrder extends Document {
  createdAt: Date;
  name: string;
  address: string;
  number: string;
  email: string;
  timezone: string;
  media: string;
  group: string;
  event: {
    _id: string;
    title: string;
  };
}

export type IFreeOrderItem = {
  _id: Types.ObjectId;
  name: string;
  address: string;
  number: string;
  email: string;
  timezone: string;
  media: string;
  group: string;
  eventTitle: string;
  eventId: string;
};

const FreeOrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  timezone: {
    type: String,
    required: true,
  },
  media: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  event: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
});

const FreeOrder = models.FreeOrder || model("FreeOrder", FreeOrderSchema);

export default FreeOrder;
