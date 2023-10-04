import React from 'react';
import { Link } from 'react-router-dom'
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <button className="sidebar-button"><Link to={'/add'}>Add a Project</Link></button>
      <button className="sidebar-button">My Projects</button>
      <button className="sidebar-button">Random Projects</button>
      <button className="sidebar-button">Saved Items</button>
      <button className="sidebar-button">Settings</button>
      <button className="sidebar-button">About</button>
    </div>
  );
}
