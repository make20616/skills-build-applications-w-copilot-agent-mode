import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profile: {
    age?: number;
    height?: number;
    weight?: number;
    fitnessLevel?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      age: Number,
      height: Number,
      weight: Number,
      fitnessLevel: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
