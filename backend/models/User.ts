import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
  _id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  role: 'USER' | 'AUTHOR' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Date },
    image: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: ['USER', 'AUTHOR', 'ADMIN'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
