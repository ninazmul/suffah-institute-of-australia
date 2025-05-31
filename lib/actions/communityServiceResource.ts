"use server";

import { CreateCommunityServiceResourceParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import CommunityServiceResource from "../database/models/communityServiceResource.model";

export const createCommunityServiceResource = async ({
  category,
  name,
  address,
  city,
  state,
  website,
  contact,
}: CreateCommunityServiceResourceParams) => {
  try {
    await connectToDatabase();

    const newCommunityServiceResource = await CommunityServiceResource.create({
      category,
      name,
      address,
      city,
      state,
      website,
      contact,
    });

    return JSON.parse(JSON.stringify(newCommunityServiceResource));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCommunityServiceResources = async () => {
  try {
    await connectToDatabase();

    const communityServiceResources = await CommunityServiceResource.find();

    return JSON.parse(JSON.stringify(communityServiceResources));
  } catch (error) {
    handleError(error);
  }
};

export const deleteCommunityServiceResource = async (
  communityServiceResourceId: string
) => {
  try {
    await connectToDatabase();

    const deletedCommunityServiceResource =
      await CommunityServiceResource.findByIdAndDelete(
        communityServiceResourceId
      );

    if (!deletedCommunityServiceResource) {
      throw new Error("CommunityServiceResource not found");
    }

    return { message: "CommunityServiceResource deleted successfully" };
  } catch (error) {
    handleError(error);
  }
};

export const updateCommunityServiceResource = async (
  communityServiceResourceId: string,
  updatedData: CreateCommunityServiceResourceParams
) => {
  try {
    await connectToDatabase();

    const updatedCommunityServiceResource =
      await CommunityServiceResource.findByIdAndUpdate(
        communityServiceResourceId,
        updatedData,
        { new: true }
      );

    if (!updatedCommunityServiceResource) {
      throw new Error("CommunityServiceResource not found");
    }

    return JSON.parse(JSON.stringify(updatedCommunityServiceResource));
  } catch (error) {
    handleError(error);
  }
};

