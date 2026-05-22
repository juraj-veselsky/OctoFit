import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  User,
  Team,
  Activity,
  Workout,
  LeaderboardEntry,
} from './models';
import { connectDatabase, MONGODB_URI } from './config/database';

dotenv.config();

const app: Express = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = process.env.API_URL || (codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    apiBaseUrl: API_BASE_URL,
    port: PORT,
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Users
app.get('/api/users', async (req: Request, res: Response) => {
  const users = await User.find().populate('team');
  res.json(users);
});

app.post('/api/users', async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Teams
app.get('/api/teams', async (req: Request, res: Response) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

app.post('/api/teams', async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

// Activities
app.get('/api/activities', async (req: Request, res: Response) => {
  const activities = await Activity.find().populate('user team');
  res.json(activities);
});

app.post('/api/activities', async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

// Leaderboard
app.get('/api/leaderboard', async (req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find()
    .populate('user team')
    .sort({ score: -1, rank: 1 });
  res.json(leaderboard);
});

app.post('/api/leaderboard', async (req: Request, res: Response) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

// Workouts
app.get('/api/workouts', async (req: Request, res: Response) => {
  const workouts = await Workout.find().populate('user');
  res.json(workouts);
});

app.post('/api/workouts', async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API base URL is ${API_BASE_URL}`);
});
