// client/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import taskService from '../services/taskService';

function Home({ user }) {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        setLoading(true);
        const data = await taskService.getTasks({ limit: 3, sort: '-createdAt' });
        setRecent(Array.isArray(data.tasks) ? data.tasks.slice(0, 3) : []);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <img src="/images/logo.png" alt="Team Logo" style={{ width: '120px', marginBottom: '20px' }} />
      <h1>Welcome to Rapid Tasks</h1>
      <p>Manage your tasks quickly and efficiently with our team-built app.</p>

      {user ? (
        <div style={{ marginTop: '32px', textAlign: 'left', maxWidth: 800, marginInline: 'auto' }}>
          <h2 style={{ textAlign: 'center' }}>Your Recent Tasks</h2>
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading...</p>
          ) : recent.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <p>No tasks yet.</p>
              <Link to="/add-task" className="btn btn-primary">Create Your First Task</Link>
            </div>
          ) : (
            <div className="task-grid">
              {recent.map(t => (
                <div key={t._id} className="task-card">
                  <div className="task-header">
                    <h3 className="task-title">{t.title}</h3>
                    <span className="task-status">{t.status}</span>
                  </div>
                  {t.description && <p className="task-description">{t.description}</p>}
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link to="/tasks" className="btn btn-secondary">View All Tasks</Link>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '16px' }}>
          <Link to="/login" className="btn btn-primary">Get Started</Link>
        </div>
      )}
    </div>
  );
}

export default Home;