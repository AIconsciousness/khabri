import mongoose, { Schema, Model } from 'mongoose';

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  displayOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    icon: { type: String },
    displayOrder: { type: Number, default: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  {
    timestamps: true,
  }
);

const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
