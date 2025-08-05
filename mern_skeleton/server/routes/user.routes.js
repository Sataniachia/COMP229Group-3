import express from 'express';
import { body } from 'express-validator';
import { protect, admin } from '../middleware/auth.js';
import userCtrl from '../controllers/user.controller.js';

const router = express.Router();

// User profile validation rules
const profileValidation = [
  body('firstName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
];

// Admin user update validation (includes isAdmin field)
const adminUserValidation = [
  ...profileValidation,
  body('isAdmin')
    .optional()
    .isBoolean()
    .withMessage('isAdmin must be a boolean value')
];

// Protected routes (require authentication)
router.use(protect);

// User profile routes
router.route('/profile')
  .get(userCtrl.read)
  .put(profileValidation, userCtrl.update)
  .delete(userCtrl.remove);

// Admin only routes
router.route('/')
  .get(admin, userCtrl.list);

router.route('/:id')
  .get(admin, userCtrl.read)
  .put(admin, adminUserValidation, userCtrl.update)
  .delete(admin, userCtrl.remove);

// Parameter handling
router.param('id', userCtrl.userByID);

export default router;
