import express from 'express';
import upload from '../middleware/upload';
import { createPost, getAllPosts } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateCreatePost } from '../middleware/validateCreatePost';
import { toggleLikePost, toggleSavePost } from "../controllers/post.controller";


const router = express.Router();
router.post('/', authenticate, upload.array('images', 5), validateCreatePost, createPost); 
router.put("/post/:postId/like", authenticate, toggleLikePost);
router.put("/post/:postId/save", authenticate, toggleSavePost); 
router.get('/', authenticate, getAllPosts);
export default router;
