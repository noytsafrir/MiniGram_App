import express from 'express';
import upload from '../middleware/upload';
import { createPost } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateCreatePost } from '../middleware/validateCreatePost';


const router = express.Router();
router.post('/', authenticate, upload.array('images', 5), validateCreatePost, createPost); 
export default router;
