import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// GET /user/preferences
router.get('/preferences', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const preferences = await prisma.preferences.findUnique({
      where: { userId },
    });

    if (!preferences) {
      // Return defaults if no preferences set
      res.json({ userId, budget: 150, categories: [] });
      return;
    }

    res.json(preferences);
  } catch (err) {
    console.error('Get preferences error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /user/preferences
router.post('/preferences', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const schema = z.object({
      budget: z.number().min(0).max(10000),
      categories: z.array(z.string()).min(1, 'Select at least one category'),
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: result.error.errors,
      });
      return;
    }

    const { budget, categories } = result.data;

    const preferences = await prisma.preferences.upsert({
      where: { userId },
      update: { budget, categories },
      create: { userId, budget, categories },
    });

    res.json(preferences);
  } catch (err) {
    console.error('Update preferences error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /user/me
router.get('/me', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
        preferences: true,
        _count: { select: { favorites: true } },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error('Get me error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

