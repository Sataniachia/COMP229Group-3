// server/routes/task.routes.js
import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/task.controller.js';

const router = express.Router();

// Task validation rules
const taskValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 255 }).withMessage('Title must be less than 255 characters'),

  body('description')
    .optional()
    .isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),

  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be one of: Pending, In Progress, Completed'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High', 'Urgent'])
    .withMessage('Priority must be one of: Low, Medium, High, Urgent'),

  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date'),

  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array')
    .customSanitizer((value) => {
      if (Array.isArray(value)) {
        return value.map(tag => tag.toString().trim()).filter(tag => tag.length > 0);
      }
      return [];
    })
];

// Protected routes (all task routes require authentication)
router.use(protect);

router.get('/stats', getTaskStats);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', taskValidation, createTask);
router.put('/:id', taskValidation, updateTask);
router.delete('/:id', deleteTask);

export default router;