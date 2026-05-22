import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  user: Types.ObjectId | string;
  name: string;
  goal: string;
  scheduledFor: Date;
  durationMinutes?: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    goal: { type: String, required: true },
    scheduledFor: { type: Date, required: true },
    durationMinutes: { type: Number },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);
