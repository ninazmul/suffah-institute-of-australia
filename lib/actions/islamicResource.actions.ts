"use server";

import { CreateIslamicResourceParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import IslamicResource from "../database/models/islamicResource.model";

export const createIslamicResource = async ({
  category,
  fileName,
  link,
}: CreateIslamicResourceParams) => {
  try {
    await connectToDatabase();

    const newIslamicResource = await IslamicResource.create({
      category,
      fileName,
      link,
    });

    return JSON.parse(JSON.stringify(newIslamicResource));
  } catch (error) {
    handleError(error);
  }
};

export const getAllIslamicResources = async () => {
  try {
    await connectToDatabase();

    const islamicResources = await IslamicResource.find();

    return JSON.parse(JSON.stringify(islamicResources));
  } catch (error) {
    handleError(error);
  }
};

export const deleteIslamicResource = async (islamicResourceId: string) => {
  try {
    await connectToDatabase();

    const deletedIslamicResource = await IslamicResource.findByIdAndDelete(
      islamicResourceId
    );

    if (!deletedIslamicResource) {
      throw new Error("IslamicResource not found");
    }

    return { message: "IslamicResource deleted successfully" };
  } catch (error) {
    handleError(error);
  }
};

export const updateIslamicResource = async (
  islamicResourceId: string,
  updatedData: CreateIslamicResourceParams
) => {
  try {
    await connectToDatabase();

    const updatedIslamicResource = await IslamicResource.findByIdAndUpdate(
      islamicResourceId,
      updatedData,
      { new: true }
    );

    if (!updatedIslamicResource) {
      throw new Error("IslamicResource not found");
    }

    return JSON.parse(JSON.stringify(updatedIslamicResource));
  } catch (error) {
    handleError(error);
  }
};
