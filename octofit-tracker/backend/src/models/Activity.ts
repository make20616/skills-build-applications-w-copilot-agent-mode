import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
