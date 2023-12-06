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

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array ensures the effect runs only once (on mount)

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
      // Clear the search results if the search query is empty
      setSearchResults({
        users: [],
        projects: [],
      });
    }
  }, [searchQuery]);


  return (
    <div className="nav">
      <LoadingBar
        // color='#f11946'
        color="#ffffff"
        progress={100}
        height={4}
        // onLoaderFinished={() => setProgress(0)}
      />
      {/* <a href="/home">DevHelp</a> */}
      <Link to={"/home"}>DevHelp</Link>
      <div className="nav-r">
        <div className="search">
          {/* <input type="text" placeholder="Search..." /> */}
          {/* <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}

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
          {/* <div className="icon-profile">


            <Link to={`/profile/${userId}`}>
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div> */}

          <div className="icon-profile" onClick={toggleProfileModal}>
            <FontAwesomeIcon icon={faUser} />
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

      {/* {chatModal && (
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
                    <img
                      src={
                        `http://localhost:5000/assets/` + chat.profile_picture
                      }
                      alt=""
                    />
                    <Link
                      to={`/chat/${chat._id}`}
                      className="light-link"
                      key={chat._id}
                    >
                      {chat.username}
                    </Link>
                    <p>{`@` + chat.username}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )} */}

      {profileModal && (
        <div className="modal">
          <div onClick={toggleProfileModal} className="overlay"></div>
          <div className="profile-modal-content">
            <div className="profile-options">
              <p
                onClick={() => handleProfileClick(`/profile/${userId}`)}
                className="user-options profile-option"
                id="profile-option"
              >
                Profile
              </p>
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
                  <div className="chat-link" key={chat._id}>
                    <img
                      src={
                        `http://localhost:5000/assets/` + chat.profile_picture
                      }
                      alt=""
                    />
                    <Link to={`/chat/${chat._id}`} className="light-link">
                    {chat.firstname + " "+ chat.lastname}
                    </Link>
                    <p>{`@` + chat.username}</p>
                  </div>
                ))}
              </div>
            }

            {/* Display a message when no chats are available */}
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
                {searchResults.users.map((user) => (
                  <span key={user._id}>
                    <Link to={`/profile/${user._id}`} className="search-link">
                      {user.username}
                    </Link>{" "}
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
                    <h3>
                      Project name:{" "}
                      <Link
                        to={`/project/${project._id}`}
                        className="search-link"
                      >
                        {project.projectName}
                      </Link>
                    </h3>
                    <p>
                      Developer:{" "}
                      <Link
                        to={`/profile/${project.developerUserId}`}
                        className="search-link"
                      >
                        {project.developerUserName}
                      </Link>
                    </p>
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
