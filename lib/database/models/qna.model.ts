import { Schema, model, models, Document } from "mongoose";

export interface IQna extends Document {
  _id: string;
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
