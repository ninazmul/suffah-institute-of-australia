import { Document, Schema, model, models } from "mongoose";

export interface ICommunityServiceResource extends Document {
  _id: string;
  category: string;
  name: string;
  address: string;
  city: string;
  state: string;
  website?: string;
  contact?: string;
}

const CommunityServiceResourceSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  website: { type: String, required: false },
  contact: { type: String, required: false },
});

const CommunityServiceResource =
  models.CommunityServiceResource || model("CommunityServiceResource", CommunityServiceResourceSchema);

export default CommunityServiceResource;
