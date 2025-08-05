import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          Rapid Tasks
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
