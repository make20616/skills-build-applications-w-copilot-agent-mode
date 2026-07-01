import express, { Router, Request, Response } from 'express';
import Activity from '../models/Activity.js';

const router: Router = express.Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({ message: 'Get all activities', data: activities });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId');
    if (!activity) {
      return res.status(404).json({ message: `Activity ${id} not found` });
    }
    res.json({ message: `Get activity ${id}`, data: activity });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// POST log new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, calories, description } = req.body;
    const activity = new Activity({ userId, type, duration, calories, description });
    await activity.save();
    await activity.populate('userId');
    res.status(201).json({ message: 'Activity logged', data: activity });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true }).populate('userId');
    if (!activity) {
      return res.status(404).json({ message: `Activity ${id} not found` });
    }
    res.json({ message: `Activity ${id} updated`, data: activity });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ message: `Activity ${id} not found` });
    }
    res.json({ message: `Activity ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
