// client/src/components/Navbar.jsx
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();

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

        <div className="navbar-nav">
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