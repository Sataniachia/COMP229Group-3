// controllers/userController.js
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Task = require('../models/Task');

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', isActive } = req.query;

    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get users with pagination
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await User.countDocuments(query);

    res.json({
      message: 'Users retrieved successfully',
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalUsers: total,
        usersPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      message: 'Server error retrieving users',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    // Get user's task statistics
    const taskStats = await Task.aggregate([
      { $match: { userId: user._id, isArchived: false } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Transform stats
    const stats = {
      totalTasks: 0,
      pending: 0,
      inProgress: 0,
      completed: 0
    };

    taskStats.forEach(stat => {
      stats.totalTasks += stat.count;
      switch (stat._id) {
        case 'Pending':
          stats.pending = stat.count;
          break;
        case 'In Progress':
          stats.inProgress = stat.count;
          break;
        case 'Completed':
          stats.completed = stat.count;
          break;
      }
    });

    res.json({
      message: 'User retrieved successfully',
      data: {
        ...user.toJSON(),
        taskStats: stats
      }
    });

  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      message: 'Server error retrieving user',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userId = req.params.id;
    const { firstName, lastName, email, role, isActive } = req.body;

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email is already taken',
        error: 'EMAIL_EXISTS'
      });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, role, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    res.json({
      message: 'User updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      message: 'Server error updating user',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting themselves
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        message: 'Cannot delete your own account',
        error: 'SELF_DELETE_NOT_ALLOWED'
      });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    // Optional: Delete all tasks associated with this user
    await Task.deleteMany({ userId });

    res.json({
      message: 'User and associated tasks deleted successfully',
      data: { id: userId }
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      message: 'Server error deleting user',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Get system statistics (Admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
const getSystemStats = async (req, res) => {
  try {
    // Get user statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });

    // Get task statistics
    const totalTasks = await Task.countDocuments({ isArchived: false });
    const completedTasks = await Task.countDocuments({ status: 'Completed', isArchived: false });
    const pendingTasks = await Task.countDocuments({ status: 'Pending', isArchived: false });
    const inProgressTasks = await Task.countDocuments({ status: 'In Progress', isArchived: false });

    // Get recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRegistrations = await User.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo } 
    });

    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        admins: adminUsers,
        recentRegistrations
      },
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      }
    };

    res.json({
      message: 'System statistics retrieved successfully',
      data: stats
    });

  } catch (error) {
    console.error('Get system stats error:', error);
    res.status(500).json({
      message: 'Server error retrieving system statistics',
      error: 'SERVER_ERROR'
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getSystemStats
};
