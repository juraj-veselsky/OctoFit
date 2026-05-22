import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import {
  User,
  Team,
  Activity,
  Workout,
  LeaderboardEntry,
} from './models';

export const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
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
