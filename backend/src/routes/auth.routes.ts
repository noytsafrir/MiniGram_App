import { Router } from 'express';
import { signup , login } from '../controllers/auth.controller';
import { authenticate, validateRegister } from '../middleware/auth.middleware';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
export default router;

router.post('/register', validateRegister, signup);
router.get('/welcome', authenticate, (req, res) => {
  res.json({ message: '🎉 Welcome! You are authenticated!' });
});
