// createAdmin.js - Run this script to create an admin user
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('./models/User');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rapidtasks');
    console.log('🍃 MongoDB Connected for admin creation');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Create admin user
const createAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@rapidtasks.com' });
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      console.log('Email: admin@rapidtasks.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Create new admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@rapidtasks.com',
      password: 'admin123',
      role: 'admin'
    });

    await adminUser.save();

    console.log('🎉 Admin user created successfully!');
    console.log('Email: admin@rapidtasks.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    console.log('');
    console.log('Now you can:');
    console.log('1. Login via POST /api/login with these credentials');
    console.log('2. Use the returned JWT token for admin operations');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();
