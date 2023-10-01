// Loading.js
import React from 'react';
import './Loading.css'; // You can style your loading screen using CSS

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
