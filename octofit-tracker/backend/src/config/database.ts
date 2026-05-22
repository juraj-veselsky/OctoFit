import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(MONGODB_URI);
  return mongoose;
};
