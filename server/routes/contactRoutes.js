import express from 'express';
import { sendMessage, getMessages } from '../controllers/contactController.js';

const router = express.Router();

const adminAuth = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey && adminKey === process.env.ADMIN_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

router.post('/', sendMessage);
router.get('/', adminAuth, getMessages);

export default router;
