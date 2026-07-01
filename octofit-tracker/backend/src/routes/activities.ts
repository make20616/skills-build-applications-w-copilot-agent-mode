import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// GET all activities
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all activities', data: [] });
});

// GET activity by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get activity ${id}`, data: { id } });
});

// POST log new activity
router.post('/', (req: Request, res: Response) => {
  const { userId, type, duration, calories } = req.body;
  res.status(201).json({ 
    message: 'Activity logged', 
    data: { userId, type, duration, calories } 
  });
});

// PUT update activity
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, duration, calories } = req.body;
  res.json({ 
    message: `Activity ${id} updated`, 
    data: { id, type, duration, calories } 
  });
});

// DELETE activity
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Activity ${id} deleted` });
});

export default router;
