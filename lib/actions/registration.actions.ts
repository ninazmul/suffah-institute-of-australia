"use server";

import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Registration from "../database/models/registration.model";
import { RegistrationParams } from "@/types";

// ====== CREATE REGISTRATION
export const createRegistration = async (params: RegistrationParams) => {
  try {
    await connectToDatabase();

    const newRegistration = await Registration.create(params);

    return JSON.parse(JSON.stringify(newRegistration));
  } catch (error) {
    handleError(error);
  }
};

// ====== GET ALL REGISTRATIONS
export const getAllRegistrations = async () => {
  try {
    await connectToDatabase();

    const registrations = await Registration.find();

    return JSON.parse(JSON.stringify(registrations));
  } catch (error) {
    handleError(error);
  }
};

// ====== GET REGISTRATION BY ID
export const getRegistrationById = async (registrationId: string) => {
  try {
    await connectToDatabase();

    const registration = await Registration.findById(registrationId);

    if (!registration) {
      throw new Error("Registration not found");
    }

    return JSON.parse(JSON.stringify(registration));
  } catch (error) {
    handleError(error);
  }
};

// ====== GET REGISTRATIONS BY EMAIL
export const getRegistrationsByEmail = async (email: string) => {

  try {
    await connectToDatabase();

    const registrations = await Registration.find({ email });

    if (!registrations || registrations.length === 0) {
      console.log(`No registrations found for email: ${email}`);
      return null;
    }

    return JSON.parse(JSON.stringify(registrations));
  } catch (error) {
    console.error("Error fetching registrations by email:", error);
    handleError(error);
  }
};

// ====== UPDATE REGISTRATION
export const updateRegistration = async (
  registrationId: string,
  updateData: Partial<RegistrationParams>
) => {
  try {
    await connectToDatabase();

    const updatedRegistration = await Registration.findByIdAndUpdate(
      registrationId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRegistration) {
      throw new Error("Registration not found");
    }

    return JSON.parse(JSON.stringify(updatedRegistration));
  } catch (error) {
    handleError(error);
  }
};

// ====== DELETE REGISTRATION
export const deleteRegistration = async (registrationId: string) => {
  try {
    await connectToDatabase();

    const deletedRegistration = await Registration.findByIdAndDelete(
      registrationId
    );

    if (!deletedRegistration) {
      throw new Error("Registration not found");
    }

    return { message: "Registration deleted successfully" };
  } catch (error) {
    handleError(error);
  }
};

// ====== CHECK REGISTRATION EXISTENCE BY EMAIL
export const isRegisteredByEmail = async (email: string): Promise<boolean> => {

  try {
    await connectToDatabase();

    // Check if a registration exists with a status other than "pending" using email
    const registration = await Registration.findOne({
      email,
      status: { $ne: "pending" }, // Exclude "pending" status
    });

    if (!registration) {
      console.log(`No non-pending registration found for email: ${email}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking registration status by email:", error);
    handleError(error);
    return false;
  }
};

// ====== CHECK SUBMIT REGISTRATION EXISTENCE BY EMAIL
export const isSubmittedByEmail = async (email: string): Promise<boolean> => {

  try {
    await connectToDatabase();

    const submitRegistration = await Registration.findOne({ email });

    if (!submitRegistration) {
      console.log(`No registration found for email: ${email}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking registration status by email:", error);
    handleError(error);
    return false;
  }
};
