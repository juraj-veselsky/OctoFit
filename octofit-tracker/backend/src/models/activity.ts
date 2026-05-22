import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId | string;
  team?: Types.ObjectId | string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned?: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number },
    caloriesBurned: { type: Number },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);
