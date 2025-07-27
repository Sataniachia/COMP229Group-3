// routes/taskRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { 
  getTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask, 
  getTaskStats 
} = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const taskValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each tag must be between 1 and 30 characters')
];

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Routes
router.get('/tasks/stats', getTaskStats);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', taskValidation, createTask);
router.put('/tasks/:id', taskValidation, updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
