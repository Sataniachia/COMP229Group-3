// client/src/pages/Tasks.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import taskService from '../services/taskService';

const Tasks = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' });

  useEffect(() => { fetchTasks(); }, []);

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

  const norm = (v='') => v.toLowerCase().replace(/\s+/g, '-'); // normalize for compare

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      const updatedTask = { ...task, status: newStatus };
      await taskService.updateTask(taskId, updatedTask);
      setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
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

  const openEdit = (task) => {
    setEditingId(task._id);
    setEditData({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'Pending',
      priority: task.priority || 'Medium',
      dueDate: task.dueDate ? task.dueDate.substring(0,10) : ''
    });
  };

  const saveEdit = async () => {
    try {
      await taskService.updateTask(editingId, editData);
      setTasks(tasks.map(t => t._id === editingId ? { ...t, ...editData } : t));
      setEditingId(null);
    } catch (e) {
      setError('Failed to update task');
    }
  };

  const getFilteredTasks = () => {
    if (filter === 'all') return tasks;
    return tasks.filter(task => norm(task.status) === filter);
  };

  const countBy = (s) => tasks.filter(t => norm(t.status) === s).length;

  const getStatusClass = (status='') => {
    const key = norm(status);
    if (key === 'pending') return 'status-pending';
    if (key === 'in-progress') return 'status-in-progress';
    if (key === 'completed') return 'status-completed';
    return 'status-pending';
  };

  const getPriorityClass = (priority='') => `priority-${norm(priority)}`;

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
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
        <h1 style={{ color:'#333' }}>My Tasks</h1>
        <Link to="/add-task" className="btn btn-primary">Add New Task</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Filter buttons */}
      <div style={{ marginBottom:'2rem' }}>
        <button className={filter==='all' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={()=>setFilter('all')} style={{ marginRight:'0.5rem' }}>
          All ({tasks.length})
        </button>
        <button className={filter==='pending' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={()=>setFilter('pending')} style={{ marginRight:'0.5rem' }}>
          Pending ({countBy('pending')})
        </button>
        <button className={filter==='in-progress' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={()=>setFilter('in-progress')} style={{ marginRight:'0.5rem' }}>
          In Progress ({countBy('in-progress')})
        </button>
        <button className={filter==='completed' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={()=>setFilter('completed')}>
          Completed ({countBy('completed')})
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="card" style={{ textAlign:'center', padding:'3rem' }}>
          <h3 style={{ color:'#666' }}>No tasks found</h3>
          <p style={{ color:'#888' }}>
            {filter==='all' ? "You haven't created any tasks yet." : `No tasks with status: ${filter.replace('-', ' ')}`}
          </p>
          <Link to="/add-task" className="btn btn-primary">Create Your First Task</Link>
        </div>
      ) : (
        <div className="task-grid">
          {filteredTasks.map(task => (
            <div key={task._id} className={`task-card ${getPriorityClass(task.priority)}`}>
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`task-status ${getStatusClass(task.status)}`}>{task.status}</span>
              </div>

              {task.description && <p className="task-description">{task.description}</p>}

              <div className="task-meta">
                <span>Priority: {task.priority}</span>
                {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
              </div>

              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="form-control"
                  style={{ width:'auto', display:'inline-block', marginRight:'0.5rem' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button onClick={() => openEdit(task)} className="btn btn-secondary" style={{ marginRight:'0.5rem' }}>
                  Edit
                </button>

                <button onClick={() => handleDeleteTask(task._id)} className="btn btn-danger">
                  Delete
                </button>
              </div>

              {/* Inline edit panel */}
              {editingId === task._id && (
                <div className="card" style={{ marginTop:'1rem', padding:'1rem', background:'#fafafa' }}>
                  <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" value={editData.title} onChange={(e)=>setEditData({...editData, title:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="3" value={editData.description} onChange={(e)=>setEditData({...editData, description:e.target.value})}/>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Status</label>
                      <select className="form-control" value={editData.status} onChange={(e)=>setEditData({...editData, status:e.target.value})}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Priority</label>
                      <select className="form-control" value={editData.priority} onChange={(e)=>setEditData({...editData, priority:e.target.value})}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Due Date</label>
                    <input type="date" className="form-control" value={editData.dueDate} onChange={(e)=>setEditData({...editData, dueDate:e.target.value})}/>
                  </div>
                  <div className="button-group">
                    <button className="btn btn-primary" onClick={saveEdit} style={{ marginRight:'0.5rem' }}>Save</button>
                    <button className="btn btn-secondary" onClick={()=>setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;