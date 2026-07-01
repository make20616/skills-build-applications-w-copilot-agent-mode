import mongoose from 'mongoose';
import { connectToDatabase, disconnectFromDatabase } from '../config/database.js';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 * 
 * This script clears existing collections and populates them with realistic
 * sample data for users, teams, activities, leaderboard rankings, and workouts.
 */

// Sample data
const sampleUsers = [
  {
    name: 'Alex Johnson',
    email: 'alex@octofit.com',
    password: 'hashedPassword123',
    profile: { age: 28, height: 180, weight: 75, fitnessLevel: 'intermediate' },
  },
  {
    name: 'Jordan Smith',
    email: 'jordan@octofit.com',
    password: 'hashedPassword123',
    profile: { age: 32, height: 175, weight: 80, fitnessLevel: 'advanced' },
  },
  {
    name: 'Casey Williams',
    email: 'casey@octofit.com',
    password: 'hashedPassword123',
    profile: { age: 25, height: 168, weight: 65, fitnessLevel: 'beginner' },
  },
  {
    name: 'Morgan Davis',
    email: 'morgan@octofit.com',
    password: 'hashedPassword123',
    profile: { age: 30, height: 172, weight: 70, fitnessLevel: 'intermediate' },
  },
  {
    name: 'Taylor Brown',
    email: 'taylor@octofit.com',
    password: 'hashedPassword123',
    profile: { age: 27, height: 178, weight: 78, fitnessLevel: 'intermediate' },
  },
];

const sampleWorkouts = [
  {
    name: 'Morning Run',
    duration: 30,
    difficulty: 'beginner',
    description: 'Easy 5K run to start the day',
    exercises: [{ name: 'Running', sets: 1, reps: 5000 }],
  },
  {
    name: 'Chest and Triceps',
    duration: 45,
    difficulty: 'intermediate',
    description: 'Full chest and triceps workout',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8 },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 10 },
      { name: 'Tricep Dips', sets: 3, reps: 12 },
    ],
  },
  {
    name: 'HIIT Cardio',
    duration: 20,
    difficulty: 'advanced',
    description: 'High intensity interval training',
    exercises: [
      { name: 'Burpees', sets: 5, reps: 10 },
      { name: 'Mountain Climbers', sets: 5, reps: 15 },
      { name: 'Jump Squats', sets: 5, reps: 12 },
    ],
  },
  {
    name: 'Yoga Flow',
    duration: 60,
    difficulty: 'beginner',
    description: 'Relaxing yoga session',
    exercises: [{ name: 'Various Yoga Poses', sets: 1, reps: 60 }],
  },
];

async function seed() {
  try {
    await connectToDatabase();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('Data cleared');

    // Seed users
    console.log('Seeding users...');
    const users = await User.insertMany(sampleUsers);
    console.log(`Created ${users.length} users`);

    // Seed teams
    console.log('Seeding teams...');
    const teams = await Team.insertMany([
      {
        name: 'Morning Warriors',
        description: 'Team for early risers',
        members: [users[0]._id, users[1]._id],
        createdBy: users[0]._id,
      },
      {
        name: 'Fitness Legends',
        description: 'Advanced fitness enthusiasts',
        members: [users[1]._id, users[3]._id, users[4]._id],
        createdBy: users[1]._id,
      },
      {
        name: 'Yoga Squad',
        description: 'Zen and mindfulness community',
        members: [users[2]._id],
        createdBy: users[2]._id,
      },
    ]);
    console.log(`Created ${teams.length} teams`);

    // Seed activities
    console.log('Seeding activities...');
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 30,
        calories: 300,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id,
        type: 'Weight Training',
        duration: 45,
        calories: 400,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id,
        type: 'Cycling',
        duration: 60,
        calories: 500,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        duration: 60,
        calories: 200,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[3]._id,
        type: 'Swimming',
        duration: 40,
        calories: 350,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[4]._id,
        type: 'Running',
        duration: 25,
        calories: 250,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`Created ${activities.length} activities`);

    // Seed leaderboard
    console.log('Seeding leaderboard...');
    const leaderboard = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        score: 700,
        rank: 2,
        totalActivities: 2,
        totalCalories: 700,
        teamId: teams[0]._id,
      },
      {
        userId: users[1]._id,
        score: 500,
        rank: 1,
        totalActivities: 1,
        totalCalories: 500,
        teamId: teams[1]._id,
      },
      {
        userId: users[2]._id,
        score: 200,
        rank: 5,
        totalActivities: 1,
        totalCalories: 200,
        teamId: teams[2]._id,
      },
      {
        userId: users[3]._id,
        score: 350,
        rank: 3,
        totalActivities: 1,
        totalCalories: 350,
        teamId: teams[1]._id,
      },
      {
        userId: users[4]._id,
        score: 250,
        rank: 4,
        totalActivities: 1,
        totalCalories: 250,
        teamId: teams[1]._id,
      },
    ]);
    console.log(`Created ${leaderboard.length} leaderboard entries`);

    // Seed workouts
    console.log('Seeding workouts...');
    const workouts = await Workout.insertMany(sampleWorkouts);
    console.log(`Created ${workouts.length} workouts`);

    console.log('\n✓ Seed script completed successfully!');
    console.log(`✓ Users: ${users.length}`);
    console.log(`✓ Teams: ${teams.length}`);
    console.log(`✓ Activities: ${activities.length}`);
    console.log(`✓ Leaderboard entries: ${leaderboard.length}`);
    console.log(`✓ Workouts: ${workouts.length}`);

    await disconnectFromDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
