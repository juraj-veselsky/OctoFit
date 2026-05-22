/*
 Seed the octofit_db database with test data
*/

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Team, Activity, Workout, LeaderboardEntry } from '../models';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seed = async () => {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  try {
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
    ]);

    const teams = await Team.create([
      {
        name: 'Team Alpha',
        description: 'High-performance runners and cyclists',
        members: [],
      },
      {
        name: 'Team Pulse',
        description: 'Fitness friends focused on strength and wellness',
        members: [],
      },
    ] as any[]);

    const users = await User.create([
      {
        name: 'Amina Reynolds',
        email: 'amina.reynolds@example.com',
        team: teams[0]._id,
      },
      {
        name: 'Diego Martinez',
        email: 'diego.martinez@example.com',
        team: teams[0]._id,
      },
      {
        name: 'Noelle Johnson',
        email: 'noelle.johnson@example.com',
        team: teams[1]._id,
      },
      {
        name: 'Ravi Singh',
        email: 'ravi.singh@example.com',
        team: teams[1]._id,
      },
    ] as any[]);

    teams[0].members = [users[0]._id, users[1]._id];
    teams[1].members = [users[2]._id, users[3]._id];
    await Promise.all(teams.map((team) => team.save()));

    await Activity.create([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'Running',
        durationMinutes: 40,
        distanceKm: 8.2,
        caloriesBurned: 520,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'Cycling',
        durationMinutes: 55,
        distanceKm: 22,
        caloriesBurned: 650,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'Yoga',
        durationMinutes: 50,
        caloriesBurned: 230,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'Strength Training',
        durationMinutes: 65,
        caloriesBurned: 700,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      },
    ]);

    await Workout.create([
      {
        user: users[0]._id,
        name: 'Morning Interval Run',
        goal: 'Improve pace over 5 km',
        scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 18),
        durationMinutes: 45,
        completed: false,
      },
      {
        user: users[2]._id,
        name: 'Core Strength Circuit',
        goal: 'Build core stability before weekend hike',
        scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 26),
        durationMinutes: 35,
        completed: false,
      },
      {
        user: users[1]._id,
        name: 'Endurance Ride',
        goal: 'Sustain 90 minutes on the bike',
        scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 42),
        durationMinutes: 90,
        completed: false,
      },
    ]);

    await LeaderboardEntry.create([
      {
        user: users[1]._id,
        team: teams[0]._id,
        score: 1860,
        rank: 1,
        lastUpdated: new Date(),
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        score: 1580,
        rank: 2,
        lastUpdated: new Date(),
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        score: 1450,
        rank: 3,
        lastUpdated: new Date(),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        score: 1320,
        rank: 4,
        lastUpdated: new Date(),
      },
    ]);

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seed().catch((error) => {
  console.error('Unexpected error during seed:', error);
  process.exit(1);
});
