import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  score: number;
  rank: number;
  totalActivities: number;
  totalCalories: number;
  teamId?: mongoose.Schema.Types.ObjectId;
  updatedAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
