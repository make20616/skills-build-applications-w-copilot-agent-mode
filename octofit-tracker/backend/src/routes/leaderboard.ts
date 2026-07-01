import express, { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router: Router = express.Router();

// GET leaderboard (all users ranked)
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).populate('userId teamId');
    res.json({
      message: 'Get leaderboard',
      data: leaderboard,
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET leaderboard for specific team
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ teamId }).sort({ rank: 1 }).populate('userId');
    res.json({
      message: `Get leaderboard for team ${teamId}`,
      data: leaderboard,
      teamId,
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET user rank
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const leaderboard = await Leaderboard.findOne({ userId }).populate('userId');
    if (!leaderboard) {
      return res.status(404).json({ message: `No leaderboard entry for user ${userId}` });
    }
    res.json({
      message: `Get rank for user ${userId}`,
      data: leaderboard,
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
