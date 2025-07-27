import {Router} from 'express';
import upload from '../middleware/upload';
import { authenticate } from '../middleware/auth.middleware';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller';
const router = Router();
router.get('/me', authenticate, getUserProfile);
router.put('/me', authenticate, upload.single('profileImg'), updateUserProfile);

export default router;