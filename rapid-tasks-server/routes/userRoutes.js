// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  getSystemStats 
} = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Validation rules for admin user updates
const userUpdateValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be user or admin'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be true or false')
];

// Apply authentication and admin middleware to all routes
router.use(authenticateToken);
router.use(requireAdmin);

// Routes
router.get('/users/stats', getSystemStats);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', userUpdateValidation, updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
