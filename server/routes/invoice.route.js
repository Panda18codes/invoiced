import express from 'express';
import { createInvoice, getInvoicesByUser } from '../controllers/invoice.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a new invoice (protected route)
router.post('/', authMiddleware, createInvoice);

// Get all invoices for a specific user (protected route)
router.get('/user/:userId', authMiddleware, getInvoicesByUser);

export default router;