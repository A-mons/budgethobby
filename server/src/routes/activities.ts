import { Router, Request, Response } from 'express';
import { prisma } from '../utils/prisma';

const router = Router();

// GET /activities
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, minPrice, maxPrice, difficulty } = req.query;

    const where: Record<string, unknown> = {};

    if (category && typeof category === 'string') {
      where.category = category;
    }

    if (difficulty && typeof difficulty === 'string') {
      where.difficulty = difficulty;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice) (where.price as Record<string, number>).gte = Number(minPrice);
      if (maxPrice) (where.price as Record<string, number>).lte = Number(maxPrice);
    }

    if (search && typeof search === 'string') {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    res.json(activities);
  } catch (err) {
    console.error('Activities error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /activities/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const activity = await prisma.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }

    res.json(activity);
  } catch (err) {
    console.error('Activity detail error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
