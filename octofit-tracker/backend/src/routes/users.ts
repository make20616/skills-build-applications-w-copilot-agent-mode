import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// GET all users
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all users', data: [] });
});

// GET user by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Get user ${id}`, data: { id } });
});

// POST create new user
router.post('/', (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.status(201).json({ message: 'User created', data: { name, email } });
});

// PUT update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({ message: `User ${id} updated`, data: { id, name, email } });
});

// DELETE user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User ${id} deleted` });
});

export default router;
