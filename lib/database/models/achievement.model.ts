import { Document, Schema, model, models } from "mongoose";

export interface IAchievement extends Document {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
}

const AchievementSchema = new Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true, },
  category: { type: String, required: true, },
  image: { type: String,},
});

const Achievement = models.Achievement || model("Achievement", AchievementSchema);

export default Achievement;
