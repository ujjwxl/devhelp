import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <Link to="/add" className="sidebar-button">
        Add a Project
      </Link>
      <Link to="/my-projects" className="sidebar-button">
        My Projects
      </Link>
      <Link to="/random-projects" className="sidebar-button">
        Random Projects
      </Link>
      <Link to="/saved-items" className="sidebar-button">
        Saved Items
      </Link>
      <Link to="/settings" className="sidebar-button">
        Settings
      </Link>
      <Link to="/about" className="sidebar-button">
        About
      </Link>
    </div>
  );
}
