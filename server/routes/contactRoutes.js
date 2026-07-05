import express from 'express';
import { sendMessage, getMessages } from '../controllers/contactController.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', contactRateLimiter, sendMessage);
router.get('/', adminAuth, getMessages);

export default router;
