import { Schema, model, models, Document, Types } from "mongoose";

export interface IQna extends Document {
  _id: Types.ObjectId;
  email: string;
  question: string;
  answer?: string;
  questionLikes: {
    count: number;
    likedBy: string[];
  };
  answerLikes: {
    count: number;
    likedBy: string[];
  };
}

const QnaSchema = new Schema<IQna>({
  email: { type: String, required: true },
  question: { type: String, required: true, unique: true },
  answer: { type: String, default: "" },
  questionLikes: {
    count: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
  },
  answerLikes: {
    count: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
  },
});

const Qna = models.Qna || model<IQna>("Qna", QnaSchema);

export default Qna;
