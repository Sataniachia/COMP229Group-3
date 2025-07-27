// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = require('./config/database');
connectDB();

// Routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Rapid Tasks API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/login, /api/register',
      tasks: '/api/tasks',
      users: '/api/users'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Rapid Tasks Server running on port ${PORT}`);
  console.log(`📋 API Documentation available at http://localhost:${PORT}/`);
});

module.exports = app;
