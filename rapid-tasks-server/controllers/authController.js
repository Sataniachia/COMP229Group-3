// controllers/authController.js
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET || 'rapid-tasks-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @desc    Register new user
// @route   POST /api/register
// @access  Public
const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email',
        error: 'EMAIL_EXISTS'
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Server error during registration',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Login user
// @route   POST /api/login
// @access  Public
const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        message: 'Account is deactivated',
        error: 'ACCOUNT_DEACTIVATED'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Server error during login',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    res.json({
      message: 'Profile retrieved successfully',
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        fullName: req.user.fullName,
        role: req.user.role,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Server error retrieving profile',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email } = req.body;
    const userId = req.user._id;

    // Check if email is already taken by another user
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({
          message: 'Email is already taken',
          error: 'EMAIL_EXISTS'
        });
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      message: 'Server error updating profile',
      error: 'SERVER_ERROR'
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
