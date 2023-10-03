  import React from 'react';
  import './Navbar.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons'; 

  export default function Navbar() {
    return (
      <div className='nav'>
        <a href='/home'>DevHelp</a>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <div className="icons">
            <div className="icon-notification">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="icon-profile">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
        </div>
      </div>
    );
  }
