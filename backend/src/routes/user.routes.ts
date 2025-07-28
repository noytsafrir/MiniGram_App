import {Router} from 'express';
import upload from '../middleware/upload';
import { authenticate } from '../middleware/auth.middleware';
import { validateUpdateUser } from '../middleware/validateUpdateUser';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller';

const router = Router();
router.get('/me', authenticate, getUserProfile);
router.put('/me', authenticate, upload.single('profileImg'),validateUpdateUser, updateUserProfile);

export default router;