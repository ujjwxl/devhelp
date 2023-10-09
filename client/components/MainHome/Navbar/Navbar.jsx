import React, { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {

  const userId = sessionStorage.getItem('id');

  const [userNotifications, setUserNotifications] = useState([]);

  const [notificationModal, setNotificationModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/notifications/${userId}`) // Replace userId with the actual user ID
      .then((response) => {
        setUserNotifications(response.data);
        console.log(userNotifications)
      })
      .catch((error) => {
        console.error("Error fetching user notifications:", error);
      });
  }, []);

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal)
  }

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
            {userNotifications.map((notification, index) => (
              <p key={index}>{notification}</p>
            ))}
            <button className="close-modal" onClick={toggleNotificationModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}


    </div>
  );
}
