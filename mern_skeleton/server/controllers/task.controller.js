import Task from "../models/task.model.js";
import extend from "lodash/extend.js";
import { getErrorMessage } from "./error.controller.js";

// Create a new task
const createTask = async (req, res) => {
  const task = new Task(req.body);
  // Set the user from the authenticated user
  task.user = req.auth._id;
  
  try {
    await task.save();
    return res.status(200).json({
      message: "Task successfully created!",
      task: task
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

// List all tasks for the authenticated user
const getTasks = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Build query
    const query = { user: req.auth._id, isArchived: false };
    
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
      .populate('user', 'firstName lastName email name');

    // Get total count for pagination
    const total = await Task.countDocuments(query);

    res.json({
      message: 'Tasks retrieved successfully',
      tasks: tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalTasks: total,
        tasksPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user', 'firstName lastName email name');
    if (!task || task.user._id.toString() !== req.auth._id.toString()) {
      return res.status(404).json({
        error: "Task not found",
      });
    }
    res.json(task);
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve task",
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.auth._id.toString()) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    const updatedTask = extend(task, req.body);
    updatedTask.updated = Date.now();
    await updatedTask.save();
    
    res.json({
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.auth._id.toString()) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    await task.deleteOne();
    res.json({
      message: "Task deleted successfully",
      task: task
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

// Get task statistics
const getTaskStats = async (req, res) => {
  try {
    const userId = req.auth._id;
    
    // Get total tasks
    const totalTasks = await Task.countDocuments({ user: userId, isArchived: false });
    
    // Get tasks by status
    const statusStats = await Task.aggregate([
      { $match: { user: userId, isArchived: false } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Get tasks by priority
    const priorityStats = await Task.aggregate([
      { $match: { user: userId, isArchived: false } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    
    // Get overdue tasks
    const overdueTasks = await Task.countDocuments({
      user: userId,
      isArchived: false,
      dueDate: { $lt: new Date() },
      status: { $ne: 'Completed' }
    });
    
    res.json({
      totalTasks,
      statusBreakdown: statusStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      priorityBreakdown: priorityStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      overdueTasks
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask, getTaskStats };
