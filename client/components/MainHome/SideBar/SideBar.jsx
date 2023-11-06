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
        <p>{followerCount + ` followers ` + followingCount + ` following`}</p>
      </div>


      <Link to="/add" className="sidebar-button">
        Add Project
      </Link>
      <Link to={`/profile/${userId}`} className="sidebar-button">
        My Projects
      </Link>
      
      <Link to="/abandon" className="sidebar-button">
        Abandon Projects
      </Link>
      <Link to="/collaborate" className="sidebar-button">
        Collaborate Projects
      </Link>
      <Link to="/saved" className="sidebar-button">
        Saved
      </Link>
      <Link to="/about" className="sidebar-button">
        About
      </Link>
    </div>
  );
}
