import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';

export default function Sidebar() {

  const userId = sessionStorage.getItem('id');
  const [userDetails, setUserDetails] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

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

  const myCld = new Cloudinary({
    cloud: {
      cloudName: "dv2z4lhfz",
    },
  });
  console.log(userDetails)
  let img = myCld.image(userDetails.profile_picture);

  return (
    <div className='sidebar'>

      <div className="sidebar-user-details">
        <Link to={`/profile/${userId}`}><AdvancedImage cldImg={img} className='sidebar-profile-picture'/></Link>
        <p>{userDetails.firstname + " " + userDetails.lastname}</p>
        <p>{`@`+userDetails.username}</p>
        <p>{followerCount + ` followers ` + followingCount + ` following`}</p>
      </div>


      <Link to="/add" className="sidebar-button">
        Add Project
      </Link>
      <Link to={`/profile/${userId}`} className="sidebar-button">
        My Projects
      </Link>
      
      <Link to="/abandon" className="sidebar-button">
        Abandoned Projects
      </Link>
      <Link to="/collaborate" className="sidebar-button">
        Collaborate Projects
      </Link>
      <Link to="/saved" className="sidebar-button">
        Saved Items
      </Link>
      <Link to="/about" className="sidebar-button">
        About
      </Link>
      <p className='sidebar-text'>© 2024 DevHelp, Inc.</p>
    </div>
  );
}
