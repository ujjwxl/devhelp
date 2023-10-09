import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {

  const userId = sessionStorage.getItem('id');

  return (
    <div className="nav">
      <a href="/home">DevHelp</a>
      <div className="nav-r">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <a href="/">
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </div>

        <div className="icons">
          <div className="icon-notification">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="icon-profile">
           <a href={`/profile/${userId}`}><FontAwesomeIcon icon={faUser} /></a> 
          </div>
        </div>
      </div>
    </div>
  );
}
