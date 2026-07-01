import express, { Router, Request, Response } from 'express';
import Workout from '../models/Workout.js';

const router: Router = express.Router();

// GET all suggested workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json({ message: 'Get all workout suggestions', data: workouts });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET personalized workouts for user (by difficulty)
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // In a real app, this would fetch user's fitness level and recommend workouts
    const workouts = await Workout.find();
    res.json({
      message: `Get personalized workouts for user ${userId}`,
      data: workouts,
      userId,
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: `Workout ${id} not found` });
    }
    res.json({ message: `Get workout ${id}`, data: workout });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// POST create new workout suggestion
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, duration, difficulty, description, exercises } = req.body;
    const workout = new Workout({ name, duration, difficulty, description, exercises });
    await workout.save();
    res.status(201).json({ message: 'Workout created', data: workout });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// PUT update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!workout) {
      return res.status(404).json({ message: `Workout ${id} not found` });
    }
    res.json({ message: `Workout ${id} updated`, data: workout });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ message: `Workout ${id} not found` });
    }
    res.json({ message: `Workout ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
