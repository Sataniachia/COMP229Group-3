// client/src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = ({ user, logout }) => {
  const [apiStatus, setApiStatus] = useState('checking');
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    const ping = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/ping');
        if (!active) return;
        if (res.ok) setApiStatus('up'); else setApiStatus('down');
      } catch {
        if (active) setApiStatus('down');
      }
    };
    ping();
    const id = setInterval(ping, 15000);
    return () => { active = false; clearInterval(id); };
  }, []);

  const statusColor = apiStatus === 'up' ? '#16a34a' : apiStatus === 'down' ? '#dc2626' : '#d97706';
  const statusLabel = apiStatus === 'up' ? 'API Online' : apiStatus === 'down' ? 'API Down' : 'Checking...';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={logo} alt="Team Logo" style={{ height: '32px' }} />
          <span>Rapid Tasks</span>
        </Link>

        <div className="navbar-nav" style={{ alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'0.75rem', padding:'2px 6px', borderRadius:'12px', background:'#1f2937', color:'#f1f5f9' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background: statusColor, display:'inline-block' }} />
            {statusLabel}
          </span>
          {user ? (
            <>
              <span className="user-info">Welcome, {user.firstName} {user.lastName}</span>
              <NavLink to="/tasks" className={navClass}>Tasks</NavLink>
              <NavLink to="/add-task" className={navClass}>Add Task</NavLink>
              <NavLink to="/profile" className={navClass}>MyProfile</NavLink>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                SignOut
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>Login</NavLink>
              <NavLink to="/register" className={navClass}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;