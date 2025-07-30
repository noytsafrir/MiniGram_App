import {Router} from 'express';
import upload from '../middleware/upload';
import { createPost, getAllPosts, getUserPosts } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateCreatePost } from '../middleware/validateCreatePost';
import { toggleLikePost, toggleSavePost, getPostsByUserId } from "../controllers/post.controller";


const router = Router();
router.post('/', authenticate, upload.array('images', 5), validateCreatePost, createPost); 
router.put("/post/:postId/like", authenticate, toggleLikePost);
router.put("/post/:postId/save", authenticate, toggleSavePost); 
router.get('/', authenticate, getAllPosts);
router.get('/user', authenticate, getUserPosts); // Get posts by the authenticated user
router.get('/user/:userId', authenticate, getPostsByUserId); // Get posts by a specific user
export default router;
