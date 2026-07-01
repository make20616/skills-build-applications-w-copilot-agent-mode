import express from 'express';
import { connectToDatabase, MONGODB_URI } from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Codespaces-aware API URL support
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Octofit Tracker API is running',
    baseUrl,
    environment: codespaceName ? 'codespaces' : 'local'
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Octofit Tracker API',
    version: '1.0.0',
    baseUrl,
    endpoints: {
      health: '/health',
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      leaderboard: '/api/leaderboard',
      workouts: '/api/workouts'
    }
  });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Octofit Tracker API listening on port ${PORT}`);
      console.log(`Base URL: ${baseUrl}`);
      console.log(`Environment: ${codespaceName ? 'codespaces' : 'local'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
