import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import taskService from '../services/taskService';

const Tasks = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      setTasks(response.tasks || []);
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Fetch tasks error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      const updatedTask = { ...task, status: newStatus };
      
      await taskService.updateTask(taskId, updatedTask);
      
      // Update local state
      setTasks(tasks.map(t => 
        t._id === taskId ? { ...t, status: newStatus } : t
      ));
    } catch (error) {
      setError('Failed to update task status');
      console.error('Update task error:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId);
        setTasks(tasks.filter(t => t._id !== taskId));
      } catch (error) {
        setError('Failed to delete task');
        console.error('Delete task error:', error);
      }
    }
  };

  const getFilteredTasks = () => {
    if (filter === 'all') return tasks;
    return tasks.filter(task => task.status.toLowerCase().replace(' ', '-') === filter);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'In Progress':
        return 'status-in-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority.toLowerCase()}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  const filteredTasks = getFilteredTasks();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#333' }}>My Tasks</h1>
        <Link to="/add-task" className="btn btn-primary">
          Add New Task
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Filter buttons */}
      <div style={{ marginBottom: '2rem' }}>
        <button 
          className={filter === 'all' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setFilter('all')}
          style={{ marginRight: '0.5rem' }}
        >
          All ({tasks.length})
        </button>
        <button 
          className={filter === 'pending' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setFilter('pending')}
          style={{ marginRight: '0.5rem' }}
        >
          Pending ({tasks.filter(t => t.status === 'Pending').length})
        </button>
        <button 
          className={filter === 'in-progress' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setFilter('in-progress')}
          style={{ marginRight: '0.5rem' }}
        >
          In Progress ({tasks.filter(t => t.status === 'In Progress').length})
        </button>
        <button 
          className={filter === 'completed' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setFilter('completed')}
        >
          Completed ({tasks.filter(t => t.status === 'Completed').length})
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3 style={{ color: '#666' }}>No tasks found</h3>
          <p style={{ color: '#888' }}>
            {filter === 'all' 
              ? "You haven't created any tasks yet." 
              : `No tasks with status: ${filter.replace('-', ' ')}`
            }
          </p>
          <Link to="/add-task" className="btn btn-primary">
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className="task-grid">
          {filteredTasks.map(task => (
            <div 
              key={task._id} 
              className={`task-card ${getPriorityClass(task.priority)}`}
            >
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`task-status ${getStatusClass(task.status)}`}>
                  {task.status}
                </span>
              </div>

              {task.description && (
                <p className="task-description">{task.description}</p>
              )}

              <div className="task-meta">
                <span>Priority: {task.priority}</span>
                {task.dueDate && (
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                )}
              </div>

              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="form-control"
                  style={{ width: 'auto', display: 'inline-block', marginRight: '0.5rem' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
