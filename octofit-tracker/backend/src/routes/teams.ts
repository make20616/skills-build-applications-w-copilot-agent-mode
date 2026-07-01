import express, { Router, Request, Response } from 'express';
import Team from '../models/Team.js';

const router: Router = express.Router();

// GET all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members createdBy');
    res.json({ message: 'Get all teams', data: teams });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// GET team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('members createdBy');
    if (!team) {
      return res.status(404).json({ message: `Team ${id} not found` });
    }
    res.json({ message: `Get team ${id}`, data: team });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// POST create new team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, members, createdBy } = req.body;
    const team = new Team({ name, description, members, createdBy });
    await team.save();
    await team.populate('members createdBy');
    res.status(201).json({ message: 'Team created', data: team });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// PUT update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, req.body, { new: true }).populate('members createdBy');
    if (!team) {
      return res.status(404).json({ message: `Team ${id} not found` });
    }
    res.json({ message: `Team ${id} updated`, data: team });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ message: `Team ${id} not found` });
    }
    res.json({ message: `Team ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
