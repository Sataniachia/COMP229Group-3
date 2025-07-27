// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(value) {
        // Allow null/undefined for optional due dates
        if (!value) return true;
        // Due date should not be in the past
        return value >= new Date().setHours(0, 0, 0, 0);
      },
      message: 'Due date cannot be in the past'
    }
  },
  completedDate: {
    type: Date
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  tags: [{
    type: String,
    trim: true
  }],
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ dueDate: 1 });

// Virtual for checking if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.status === 'Completed') return false;
  return this.dueDate < new Date();
});

// Virtual for days until due
taskSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate) return null;
  const today = new Date();
  const diffTime = this.dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Pre-save middleware to set completed date
taskSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'Completed' && !this.completedDate) {
      this.completedDate = new Date();
    } else if (this.status !== 'Completed') {
      this.completedDate = undefined;
    }
  }
  next();
});

// Ensure virtuals are included in JSON
taskSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', taskSchema);
