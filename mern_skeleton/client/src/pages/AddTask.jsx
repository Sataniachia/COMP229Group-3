// client/src/pages/AddTask.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const taskData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };
      await taskService.createTask(taskData);
      navigate('/tasks');
    } catch (error) {
      setError(error.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="card">
        <h2>Add New Task</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input type="text" id="title" name="title" value={formData.title}
              onChange={handleChange} className="form-control" required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description}
              onChange={handleChange} rows="4" className="form-control" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="form-control">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" value={formData.priority} onChange={handleChange} className="form-control">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input type="date" id="dueDate" name="dueDate" value={formData.dueDate}
              onChange={handleChange} className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input type="text" id="tags" name="tags" value={formData.tags}
              onChange={handleChange} placeholder="e.g. work, urgent, project" className="form-control" />
          </div>

          <div className="button-group">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Creating Task...' : 'Create Task'}
            </button>
            <button type="button" onClick={() => navigate('/tasks')} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;