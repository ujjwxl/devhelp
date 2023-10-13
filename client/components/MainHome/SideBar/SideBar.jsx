import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {

  const userId = sessionStorage.getItem('id');
  const [userDetails, setUserDetails] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  // console.log(userDetails)

  useEffect(() => {
    axios
      .post("http://localhost:5000/auth/find", { userId })
      .then((response) => {
        setUserDetails(response.data);
        setFollowerCount(response.data.followers.length);
        setFollowingCount(response.data.following.length);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId]);

  return (
    <div className='sidebar'>

      <div className="sidebar-user-details">
        {/* <img src="src\assets\default-pfp.png" alt="" className='sidebar-profile-picture' /> */}
        <img src="../../../src/assets/default-pfp.png" alt="" className='sidebar-profile-picture' />
        <p>{userDetails.firstname + " " + userDetails.lastname}</p>
        <p>{`@`+userDetails.username}</p>
        {/* <div className="sidebar-user-profiile-follow">
          <p>{followerCount + ` followers`}</p>
          <p>{followingCount + `following`}</p>
        </div> */}
        <p>{followerCount + ` followers ` +  followingCount + `following`}</p>
      </div>


      <Link to="/add" className="sidebar-button">
        Add a Project
      </Link>
      <Link to="/my-projects" className="sidebar-button">
        My Projects
      </Link>
      <Link to="/random-projects" className="sidebar-button">
        Random Projects
      </Link>
      <Link to="/saved-items" className="sidebar-button">
        Saved Items
      </Link>
      <Link to="/settings" className="sidebar-button">
        Settings
      </Link>
      <Link to="/about" className="sidebar-button">
        About
      </Link>
    </div>
  );
}
