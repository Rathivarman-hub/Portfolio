import express from 'express';
import { getSkills, createSkill } from '../controllers/skillController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', adminAuth, createSkill);

export default router;
