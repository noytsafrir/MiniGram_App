import express from 'express';
import upload from '../middleware/upload';
import { createPost } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// router.post('/create', upload.array('images', 5), createPost);
router.post('/', upload.array('images', 5), authenticate, createPost); 
export default router;
