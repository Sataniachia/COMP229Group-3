import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
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
        if (!value) return true; // optional
        return value >= new Date().setHours(0,0,0,0);
      },
      message: 'Due date cannot be in the past'
    }
  },
  completedDate: { type: Date },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  tags: [{ type: String, trim: true }],
  isArchived: { type: Boolean, default: false }
}, { timestamps: true });

TaskSchema.index({ user: 1, status: 1 });
TaskSchema.index({ dueDate: 1 });

TaskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.status === 'Completed') return false;
  return this.dueDate < new Date();
});

TaskSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate) return null;
  const diffTime = this.dueDate - new Date();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

TaskSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'Completed' && !this.completedDate) {
      this.completedDate = new Date();
    } else if (this.status !== 'Completed') {
      this.completedDate = undefined;
    }
  }
  next();
});

TaskSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Task', TaskSchema);