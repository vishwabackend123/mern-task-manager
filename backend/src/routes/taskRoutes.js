import express from 'express';
import {
  createTask, getTasks, getTaskById, updateTask, deleteTask, getStats,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateTask } from '../validators/taskValidator.js';

const router = express.Router();
router.use(protect);

router.get('/stats', getStats);
router.route('/').get(getTasks).post(validateTask, createTask);
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

export default router;