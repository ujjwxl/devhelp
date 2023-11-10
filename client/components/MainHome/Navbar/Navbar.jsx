import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "../../Notifications/Notifications";
import LoadingBar from "react-top-loading-bar";

export default function Navbar() {
  const userId = sessionStorage.getItem("id");

  const [notificationModal, setNotificationModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [chatModal, setChatModal] = useState(false); // New state for chat modal
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [searchResults, setSearchResults] = useState({
    users: [],
    projects: [],
  });
  const [userChats, setUserChats] = useState([]); // State to store user chats

  const toggleNotificationModal = () => {
    setNotificationModal(!notificationModal);
  };

  const toggleSearchModal = () => {
    setSearchModal(!searchModal);
  };

  const toggleChatModal = () => {
    setChatModal(!chatModal);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/auth/search?query=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const fetchUserChats = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/auth/chats/${userId}`
      );
      setUserChats(response.data);
    } catch (error) {
      console.error("Error fetching user chats:", error);
    }
  };

  return (
    <div className="nav">
      <LoadingBar
        // color='#f11946'
        color="#ffffff"
        progress={100}
        height={3}
      // onLoaderFinished={() => setProgress(0)}
      />
      {/* <a href="/home">DevHelp</a> */}
      <Link to={"/home"}>DevHelp</Link>
      <div className="nav-r">
        <div className="search">
          {/* <input type="text" placeholder="Search..." /> */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="search-btn"
            onClick={() => {
              handleSearch();
              toggleSearchModal();
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="icons">
          <div
            className="icon-chat"
            onClick={() => {
              toggleChatModal();
              fetchUserChats();
            }}
          >
            <FontAwesomeIcon icon={faComment} />
          </div>
          <div className="icon-notification" onClick={toggleNotificationModal}>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="icon-profile">
            {/* <a href={`/profile/${userId}`}>
              <FontAwesomeIcon icon={faUser} />
            </a> */}

            <Link to={`/profile/${userId}`}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </div>
      </div>

      {/* {chatModal && (
        <div className="modal">
          <div onClick={toggleChatModal} className="overlay"></div>
          <div className="search-modal-content">
            <div className="modal-header">
              <h2>Chat</h2>
              <button className="close-modal" onClick={toggleChatModal}>
                CLOSE
              </button>
            </div>
            <div className="chat-links">
              {userChats.map((chat) => (
                <Link to={`/chat/${chat._id}`} className="light-link">{chat.username}</Link>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {chatModal && (
        <div className="modal">
          <div onClick={toggleChatModal} className="overlay"></div>
          <div className="search-modal-content">
            <div className="modal-header">
              <h2>Chats</h2>
              <button className="close-modal" onClick={toggleChatModal}>
                CLOSE
              </button>
            </div>
            {userChats.length === 0 ? (
              <p>No chats available</p>
            ) : (
              <div className="chat-links">
                {userChats.map((chat) => (
                  <div className="chat-link">
                    <img src={`http://localhost:5000/assets/` + chat.profile_picture} alt="" />
                    <Link to={`/chat/${chat._id}`} className="light-link" key={chat._id}>
                      {chat.username}
                    </Link>
                    <p>{`@` + chat.username}</p>
                  </div>

                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {notificationModal && (
        <div className="modal">
          <div onClick={toggleNotificationModal} className="overlay"></div>
          <div className="notification-modal-content">
            <div className="modal-header">
              <h2>Notifications</h2>
              <button className="close-modal" onClick={toggleNotificationModal}>
                CLOSE
              </button>
            </div>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae
            </p> */}
            {/* {userNotifications.map((notification, index) => (
              <p key={index}>{notification}</p>
            ))} */}
            <Notifications></Notifications>
          </div>
        </div>
      )}

      {searchModal && (
        <div className="modal">
          <div onClick={toggleSearchModal} className="overlay"></div>
          <div className="search-modal-content">
            {searchResults.users.length > 0 && (
              <div>
                <h2 className="search-h2">Users</h2>
                {searchResults.users.map((user) => (
                  <span key={user._id}>
                    <Link to={`/profile/${user._id}`} className="search-link">{user.username}</Link>{" "}
                    <br />
                  </span>
                ))}
              </div>
            )}

            {searchResults.projects.length > 0 && (
              <div>
                <h2 className="search-h2">Projects</h2>
                {searchResults.projects.map((project) => (
                  <div key={project._id}>
                    {/* <h3>Project name: <a href={`/project/${project._id}`}>{project.projectName}</a></h3>
                    <p>Developer: <a href={`/profile/${project.developerUserId}`}>{project.developerUserName}</a></p> */}
                    <h3>
                      Project name:{" "}
                      <Link to={`/project/${project._id}`} className="search-link">
                        {project.projectName}
                      </Link>
                    </h3>
                    <p>
                      Developer:{" "}
                      <Link to={`/profile/${project.developerUserId}`} className="search-link">
                        {project.developerUserName}
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button className="close-modal" onClick={toggleSearchModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
