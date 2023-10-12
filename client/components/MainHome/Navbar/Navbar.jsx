import React, { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import Notifications from "../../Notifications/Notifications";

export default function Navbar() {

  const userId = sessionStorage.getItem('id');

  const [notificationModal, setNotificationModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal)
  }

  const toggleSearchModal = () => {
    setSearchModal(!searchModal)
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  return (
    <div className="nav">
      <a href="/home">DevHelp</a>
      <div className="nav-r">
        <div className="search">
          {/* <input type="text" placeholder="Search..." /> */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => { handleSearch(); toggleSearchModal(); }}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="icons">
          <div className="icon-notification" onClick={toggleNotificationModal}>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="icon-profile">
            <a href={`/profile/${userId}`}><FontAwesomeIcon icon={faUser} /></a>
          </div>
        </div>
      </div>

      {notificationModal && (
        <div className="modal">
          <div onClick={toggleNotificationModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Notifications</h2>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae
            </p> */}
            {/* {userNotifications.map((notification, index) => (
              <p key={index}>{notification}</p>
            ))} */}
            <Notifications></Notifications>
            <button className="close-modal" onClick={toggleNotificationModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((user) => (
              <li key={user._id}>
                <a href={`/profile/${user._id}`}>{user.username}</a>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {searchResults.length > 0 && searchModal && (
        <div className="modal">
          <div onClick={toggleSearchModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Search Users</h2>
            <p>
              {searchResults.map((user, index) => (
                <span key={user._id}>
                  {index > 0 && ', '} {/* Add a comma and space for all items except the first */}
                  <a href={`/profile/${user._id}`}>{user.username}</a> <br/>
                </span>
              ))}
            </p>
            <button className="close-modal" onClick={toggleSearchModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}
