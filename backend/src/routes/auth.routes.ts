import { Router } from 'express';
import { signup , login } from '../controllers/auth.controller';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
export default router;

import { authenticate } from '../middleware/auth.middleware';

router.get('/welcome', authenticate, (req, res) => {
  res.json({ message: '🎉 Welcome! You are authenticated!' });
});
