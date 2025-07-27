// controllers/taskController.js
const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// @desc    Get all tasks for authenticated user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, priority, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    // Build query
    const query = { userId, isArchived: false };
    
    if (status) {
      query.status = status;
    }
    
    if (priority) {
      query.priority = priority;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get tasks with pagination
    const tasks = await Task.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'firstName lastName email');

    // Get total count for pagination
    const total = await Task.countDocuments(query);

    res.json({
      message: 'Tasks retrieved successfully',
      data: tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalTasks: total,
        tasksPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      message: 'Server error retrieving tasks',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: taskId, userId })
      .populate('userId', 'firstName lastName email');

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
        error: 'TASK_NOT_FOUND'
      });
    }

    res.json({
      message: 'Task retrieved successfully',
      data: task
    });

  } catch (error) {
    console.error('Get task by ID error:', error);
    res.status(500).json({
      message: 'Server error retrieving task',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, description, status, priority, dueDate, tags } = req.body;
    const userId = req.user._id;

    // Create new task
    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: tags || [],
      userId
    });

    await task.save();

    // Populate user information
    await task.populate('userId', 'firstName lastName email');

    res.status(201).json({
      message: 'Task created successfully',
      data: task
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      message: 'Server error creating task',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const taskId = req.params.id;
    const userId = req.user._id;
    const { title, description, status, priority, dueDate, tags } = req.body;

    // Find and update task
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        tags: tags || []
      },
      { new: true, runValidators: true }
    ).populate('userId', 'firstName lastName email');

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
        error: 'TASK_NOT_FOUND'
      });
    }

    res.json({
      message: 'Task updated successfully',
      data: task
    });

  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      message: 'Server error updating task',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
        error: 'TASK_NOT_FOUND'
      });
    }

    res.json({
      message: 'Task deleted successfully',
      data: { id: taskId }
    });

  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      message: 'Server error deleting task',
      error: 'SERVER_ERROR'
    });
  }
};

// @desc    Get task statistics for user
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Task.aggregate([
      { $match: { userId: userId, isArchived: false } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Transform stats to object
    const taskStats = {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0
    };

    stats.forEach(stat => {
      taskStats.total += stat.count;
      switch (stat._id) {
        case 'Pending':
          taskStats.pending = stat.count;
          break;
        case 'In Progress':
          taskStats.inProgress = stat.count;
          break;
        case 'Completed':
          taskStats.completed = stat.count;
          break;
      }
    });

    // Get overdue tasks count
    const overdueCount = await Task.countDocuments({
      userId,
      isArchived: false,
      status: { $ne: 'Completed' },
      dueDate: { $lt: new Date() }
    });

    taskStats.overdue = overdueCount;

    res.json({
      message: 'Task statistics retrieved successfully',
      data: taskStats
    });

  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({
      message: 'Server error retrieving task statistics',
      error: 'SERVER_ERROR'
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
};
