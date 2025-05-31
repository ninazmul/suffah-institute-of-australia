import { Document, Schema, model, models } from "mongoose";

export interface IIslamicResource extends Document {
  _id: string;
  category: string;
  fileName: string;
  link: string;
}

const IslamicResourceSchema = new Schema({
  category: { type: String, required: true },
  fileName: { type: String, required: true },
  link: { type: String, required: true },
});

const IslamicResource =
  models.IslamicResource || model("IslamicResource", IslamicResourceSchema);

export default IslamicResource;
