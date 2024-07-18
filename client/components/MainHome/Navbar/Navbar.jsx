import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faComment,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "../../Notifications/Notifications";
import LoadingBar from "react-top-loading-bar";
import userimg from '../../../src/assets/user.png';
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';

export default function Navbar() {
  const userId = sessionStorage.getItem("id");

  const [notificationModal, setNotificationModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    users: [],
    projects: [],
  });
  const [userChats, setUserChats] = useState([]);
  const [profileModal, setProfileModal] = useState(false);

  const searchInputRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "/") {
      event.preventDefault();
      // Focus on the search input when '/' key is pressed
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

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

  const handleSignOut = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };
  const handleProfileClick = (profileLink) => {
    window.location.href = profileLink;
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch();
      setSearchModal(true)
    } else {
      setSearchResults({
        users: [],
        projects: [],
      });
    }
  }, [searchQuery]);

  const myCld = new Cloudinary({
    cloud: {
      cloudName: "dv2z4lhfz",
    },
  });


  return (
    <div className="nav">
      <LoadingBar
        // color='#f11946'
        color="#28293D"
        progress={100}
        height={4}
      />
      <Link to={"/home"}>DevHelp</Link>
      <div className="nav-r">
        <div className="search">
          <input
            type="text"
            placeholder="Click or press / to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
                toggleSearchModal();
              }
            }}
            ref={searchInputRef}
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
          <div className="icon-profile" onClick={toggleProfileModal}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>

      {profileModal && (
        <div className="modal">
          <div onClick={toggleProfileModal} className="overlay"></div>
          <div className="profile-modal-content">
            <div className="profile-options">
              <Link to={`/profile/${userId}`}>
              <p
                className="user-options profile-option"
                id="profile-option"
              >
                Profile
              </p>
              </Link>
              <div className="animated-line" id="profile-line"></div>
              <p
                onClick={handleSignOut}
                className="user-options sign-out-option"
                id="sign-out-option"
              >
                Sign Out
              </p>
              <div className="animated-line" id="sign-out-line"></div>
            </div>
          </div>
        </div>
      )}

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
            {
              <div className="chat-links">
                {userChats.map((chat) => (
                  <div className="chat-link user-name-chat" key={chat._id}>
                    <AdvancedImage cldImg={myCld.image(chat.profile_picture)}/>
                    <Link to={`/chat/${chat._id}`} className="light-link">
                    {chat.firstname + " "+ chat.lastname}
                    </Link>
                    <p>{`@` + chat.username}</p>
                  </div>
                ))}
              </div>
            }
            
            {userChats.length === 0 && <h3>No chats available</h3>}
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
                <div className="search-link">
                {searchResults.users.map((user) => (
                  <span key={user._id}>
                  <div className="user-name">
                  <img src={userimg} alt="User" className="user-svg" />
                    <Link to={`/profile/${user._id}`} className="search-link">
                      {user.username}
                    </Link>{" "}
                    <br />
                    </div>
                  </span>
                ))}
                </div>
                <hr/>
              </div>
            )}

            {searchResults.projects.length > 0 && (
              <div>
                <h2 className="search-h2">Projects</h2>
                {searchResults.projects.map((project) => (
                  <div key={project._id}>
                    <h3 className="search-h3 search-link-a">
                      Project name:{" "}
                      <Link
                        to={`/project/${project._id}`}
                      >
                        {project.projectName}
                      </Link>
                    </h3>
                    <h3 className="search-h3 search-link-a">
                      Developer:{" "}
                      <Link
                        to={`/profile/${project.developerUserId}`}
                        className="search-link"
                      >
                        {project.developerUserName}
                      </Link>
                    </h3>
                    <hr/>
                  </div>
                ))}
              </div>
            )}

            {/* Display a message when no results are found */}
            {searchResults.users.length === 0 &&
              searchResults.projects.length === 0 && <h3>No results found</h3>}

            <button className="close-modal" onClick={toggleSearchModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
