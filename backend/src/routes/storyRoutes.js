import express from 'express';
import { createStory, getStories } from '../controllers/storyController.js';
import { protectSeller } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protectSeller, createStory);
router.get('/', getStories);

export default router;
