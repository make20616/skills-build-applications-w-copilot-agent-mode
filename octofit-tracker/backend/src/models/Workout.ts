import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  duration: number;
  difficulty: string;
  description: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    description: String,
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
