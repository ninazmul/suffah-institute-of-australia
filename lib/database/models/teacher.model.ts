import { Document, Schema, model, models } from "mongoose";

export interface ITeacher extends Document {
  _id: string;
  name: string;
  email: string;
}

const TeacherSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const Teacher = models.Teacher || model("Teacher", TeacherSchema);

export default Teacher;
