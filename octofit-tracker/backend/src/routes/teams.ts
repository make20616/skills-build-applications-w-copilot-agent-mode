import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// GET all teams
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all teams', data: [] });
});

// GET team by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get team ${id}`, data: { id } });
});

// POST create new team
router.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
  res.status(201).json({ message: 'Team created', data: { name, description } });
});

// PUT update team
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  res.json({ message: `Team ${id} updated`, data: { id, name, description } });
});

// DELETE team
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Team ${id} deleted` });
});

export default router;
