"use server";

import { CreateQnaParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Qna from "../database/models/qna.model";

// ✅ Create a QnA (User)
export const createQna = async ({
  Question,
  Answer = "",
  QuestionLikes = { count: 0, likedBy: [] },
  AnswerLikes = { count: 0, likedBy: [] },
}: CreateQnaParams) => {
  try {
    await connectToDatabase();

    const newQna = await Qna.create({
      question: Question,
      answer: Answer,
      questionLikes: QuestionLikes,
      answerLikes: AnswerLikes,
    });

    return JSON.parse(JSON.stringify(newQna));
  } catch (error) {
    handleError(error);
  }
};

// ✅ Update answer for a QnA item by ID
export const updateAnswer = async (qnaId: string, newAnswer: string) => {
  try {
    await connectToDatabase();

    const updatedQna = await Qna.findByIdAndUpdate(
      qnaId,
      { answer: newAnswer },
      { new: true }
    );

    if (!updatedQna) {
      throw new Error("QnA not found");
    }

    return JSON.parse(JSON.stringify(updatedQna));
  } catch (error) {
    handleError(error);
  }
};

// ✅ Get all QnAs
export const getAllQna = async () => {
  try {
    await connectToDatabase();

    const qna = await Qna.find();

    return JSON.parse(JSON.stringify(qna));
  } catch (error) {
    handleError(error);
  }
};

// ✅ Delete QnA (Admin)
export const deleteQna = async (qnaId: string) => {
  try {
    await connectToDatabase();

    const deletedQna = await Qna.findByIdAndDelete(qnaId);

    if (!deletedQna) {
      throw new Error("QnA not found");
    }

    return { message: "QnA deleted successfully" };
  } catch (error) {
    handleError(error);
  }
};

// ✅ Like Question (One user can like only once)
export const likeQuestion = async (qnaId: string, userId: string) => {
  try {
    await connectToDatabase();

    const qna = await Qna.findById(qnaId);
    if (!qna) throw new Error("QnA not found");

    if (qna.questionLikes.likedBy.includes(userId)) {
      throw new Error("User already liked this question");
    }

    qna.questionLikes.count += 1;
    qna.questionLikes.likedBy.push(userId);

    await qna.save();

    return JSON.parse(JSON.stringify(qna));
  } catch (error) {
    handleError(error);
  }
};

// ✅ Like Answer (One user can like only once)
export const likeAnswer = async (qnaId: string, userId: string) => {
  try {
    await connectToDatabase();

    const qna = await Qna.findById(qnaId);
    if (!qna) throw new Error("QnA not found");

    if (qna.answerLikes.likedBy.includes(userId)) {
      throw new Error("User already liked this answer");
    }

    qna.answerLikes.count += 1;
    qna.answerLikes.likedBy.push(userId);

    await qna.save();

    return JSON.parse(JSON.stringify(qna));
  } catch (error) {
    handleError(error);
  }
};
