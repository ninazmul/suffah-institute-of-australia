import { Document, Schema, model, models } from "mongoose";

export interface IGallery extends Document {
  _id: string;
  title: string;
  image: string;
}

const GallerySchema = new Schema({
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true, unique: true },
});

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery;
