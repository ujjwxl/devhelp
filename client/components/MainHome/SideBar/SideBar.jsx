import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <button className="sidebar-button">Add a Project</button>
      <button className="sidebar-button">My Projects</button>
      <button className="sidebar-button">Random Projects</button>
      <button className="sidebar-button">Saved Items</button>
      <button className="sidebar-button">Settings</button>
      <button className="sidebar-button">About</button>
    </div>
  );
}
