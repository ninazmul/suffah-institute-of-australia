import { Document, Schema, Types, model, models } from "mongoose";

export interface ITeacher extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
}

const TeacherSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const Teacher = models.Teacher || model("Teacher", TeacherSchema);

export default Teacher;
