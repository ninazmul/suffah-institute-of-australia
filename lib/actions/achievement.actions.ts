"use server";

import { AddAchievementParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Achievement from "../database/models/achievement.model";

export const createAchievement = async (params: AddAchievementParams) => {
  try {
    await connectToDatabase();
    const newAchievement = await Achievement.create(params);
    return JSON.parse(JSON.stringify(newAchievement));
  } catch (error) {
    handleError(error);
  }
};

export const getAllAchievement = async () => {
  try {
    await connectToDatabase();

    const achievement = await Achievement.find();

    return JSON.parse(JSON.stringify(achievement));
  } catch (error) {
    handleError(error);
  }
};

export const deleteAchievement = async (achievementId: string) => {
  try {
    await connectToDatabase();

    const deletedAchievement = await Achievement.findByIdAndDelete(achievementId);

    if (!deletedAchievement) {
      throw new Error("Achievement not found");
    }

    return { message: "Achievement deleted successfully" };
  } catch (error) {
    handleError(error);
  }
};



