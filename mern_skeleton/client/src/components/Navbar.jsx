import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
              <span className="user-info">
                Welcome, {user.firstName} {user.lastName}
              </span>
              <Link to="/tasks" className="nav-link">
                Tasks
              </Link>
              <Link to="/add-task" className="nav-link">
                Add Task
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button 
                onClick={handleLogout} 
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;