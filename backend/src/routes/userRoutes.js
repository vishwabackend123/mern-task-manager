import express from 'express';
import { getAllUsers, getUserById, deleteUser } from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', restrictTo('admin'), getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', restrictTo('admin'), deleteUser);
export default router;