import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// GET /favorites
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: { activity: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(favorites);
  } catch (err) {
    console.error('Favorites error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /favorites
router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const schema = z.object({ activityId: z.string().min(1) });
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: 'activityId is required' });
      return;
    }

    const { activityId } = result.data;

    // Check activity exists
    const activity = await prisma.activity.findUnique({ where: { id: activityId } });
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }

    // Upsert to avoid duplicates
    const favorite = await prisma.favorite.upsert({
      where: { userId_activityId: { userId, activityId } },
      update: {},
      create: { userId, activityId },
      include: { activity: true },
    });

    res.status(201).json(favorite);
  } catch (err) {
    console.error('Add favorite error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /favorites/:id
router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const favorite = await prisma.favorite.findFirst({
      where: { id, userId },
    });

    if (!favorite) {
      res.status(404).json({ error: 'Favorite not found' });
      return;
    }

    await prisma.favorite.delete({ where: { id } });
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error('Remove favorite error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
