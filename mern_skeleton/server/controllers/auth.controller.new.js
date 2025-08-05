import jwt from "jsonwebtoken";
import { validationResult } from 'express-validator';
import User from "../models/user.model.js";
import config from "./../../config/config.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { _id: userId }, 
    config.jwtSecret,
    { expiresIn: '7d' }
  );
};

// @desc    Register new user
// @route   POST /api/register
// @access  Public
const register = async (req, res) => {
  try {
    console.log("🔄 Registration attempt:", req.body);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("❌ Validation errors:", errors.array());
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, password } = req.body;
    console.log("📝 Creating user with:", { firstName, lastName, email, passwordLength: password?.length });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({
        message: 'User already exists with this email',
        error: 'EMAIL_EXISTS'
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      password
    });

    console.log("💾 Saving user...");
    await user.save();
    console.log("✅ User saved successfully with ID:", user._id);

    // Generate token
    const token = generateToken(user._id);

    const response = {
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
    };

    console.log("✅ Registration successful for:", email);
    res.status(201).json(response);
  } catch (error) {
    console.error('❌ Registration error:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    res.status(500).json({
      message: 'Server error during registration',
      error: 'SERVER_ERROR',
      details: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/login
// @access  Public
const login = async (req, res) => {
  try {
    console.log("🔑 Login attempt:", { email: req.body.email, hasPassword: !!req.body.password });
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("❌ Login validation errors:", errors.array());
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    console.log("🔍 Looking for user:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(401).json({
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS'
      });
    }

    console.log("✅ User found:", { 
      id: user._id, 
      email: user.email, 
      hasHashedPassword: !!user.hashed_password,
      hasSalt: !!user.salt,
      isActive: user.isActive 
    });

    // Check password
    console.log("🔐 Testing password authentication...");
    const isPasswordValid = user.authenticate(password);
    console.log("Password authentication result:", isPasswordValid);
    
    if (!isPasswordValid) {
      console.log("❌ Invalid password for user:", email);
      // Debug encryption
      console.log("Debug - Salt:", user.salt);
      console.log("Debug - Stored hash:", user.hashed_password);
      console.log("Debug - Test hash:", user.encryptPassword(password));
      
      return res.status(401).json({
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // Generate token
    console.log("🎟️ Generating JWT token...");
    const token = generateToken(user._id);

    const response = {
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
    };

    console.log("✅ Login successful for:", email);
    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Server error during login',
      error: 'SERVER_ERROR'
    });
  }
};

export default { 
  register,
  login
};
