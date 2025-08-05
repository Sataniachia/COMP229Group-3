import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import config from '../../config/config.js';

// Protect routes middleware
export const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        message: 'Not authorized to access this route',
        error: 'NO_TOKEN'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);

      // Get user from the token (set both req.user and req.auth for compatibility)
      const user = await User.findById(decoded._id).select('-hashed_password -salt');

      if (!user) {
        return res.status(401).json({
          message: 'Token is valid but user not found',
          error: 'USER_NOT_FOUND'
        });
      }

      req.user = user;
      req.auth = user; // For compatibility with task controller

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        message: 'Not authorized, token failed',
        error: 'INVALID_TOKEN'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      message: 'Server error in authentication',
      error: 'SERVER_ERROR'
    });
  }
};

// Admin access middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      message: 'Not authorized as an admin',
      error: 'NOT_ADMIN'
    });
  }
};

// Optional auth middleware - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  let token;

  try {
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Get user from the token
        req.user = await User.findById(decoded._id).select('-hashed_password -salt');
      } catch (error) {
        // Token invalid, but don't fail - just continue without user
        req.user = null;
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};
