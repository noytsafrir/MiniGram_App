import { Router } from 'express';
import { signup , login } from '../controllers/auth.controller';
import { authenticate, validateRegister } from '../middleware/auth.middleware';

const router = Router();
router.post('/signup', validateRegister,signup);
router.post('/login', login);
// router.post('/register', validateRegister, signup);



export default router;
