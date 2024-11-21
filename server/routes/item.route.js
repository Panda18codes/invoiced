import express from 'express';
import { createItem, getAllItems } from '../controllers/item.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a new item (protected route)
router.post('/', authMiddleware, createItem);

// Get all items (protected route)
router.get('/', authMiddleware, getAllItems);

export default router;