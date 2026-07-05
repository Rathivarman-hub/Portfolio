import express from 'express';
import { getProjects, getProject, createProject } from '../controllers/projectController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', adminAuth, createProject);

export default router;
