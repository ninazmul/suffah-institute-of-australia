"use server";

import { CreateTeacherParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Teacher from "../database/models/teacher.model";

export const createTeacher = async ({ Name, Email }: CreateTeacherParams) => {
  try {
    await connectToDatabase();

    const newTeacher = await Teacher.create({ name: Name, email: Email });

    return JSON.parse(JSON.stringify(newTeacher));
  } catch (error) {
    handleError(error);
  }
};

export const getAllTeachers = async () => {
  try {
    await connectToDatabase();

    const teachers = await Teacher.find();

    return JSON.parse(JSON.stringify(teachers));
  } catch (error) {
    handleError(error);
  }
};

export const deleteTeacher = async (teacherId: string) => {
  try {
    await connectToDatabase();

    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      throw new Error("Teacher not found");
    }

    return { message: "Teacher deleted successfully" };
  } catch (error) {
    handleError(error);
  }
};

export async function isTeacher(email: string): Promise<boolean> {
  if (!email) {
    return false;
  }

  try {
    await connectToDatabase();

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      console.log(`No teacher found for email: ${email}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking teacher status:", error);
    return false;
  }
}



