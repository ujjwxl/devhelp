import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import "./ProfileCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProfileCard() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState([]);

  // const userId = sessionStorage.getItem('id');

  useEffect(() => {
    axios.post('http://localhost:5000/auth/find', { userId })
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [userId]);

  return (
    <div className="profile-card">
      <img
        className="profile-cover"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_DH5SrhMqR_a1X-CAeXcV0m4GINEEhEPytA&usqp=CAU"
      ></img>
      <div className="profile-card-link-btn">
      <div className="profile-card-footer">
        <div className="profile-techstack">
          <p className="profile-card-techstack">{userDetails.technologyOne}</p>
          <p className="profile-card-techstack">{userDetails.technologyTwo}</p>
          <p className="profile-card-techstack">{userDetails.technologyThree}</p>
        </div>

        <div className="profile-links">
          <span className="profile-footer-icons">
            <FontAwesomeIcon icon={faGithub} className="profile-icon" />
          </span>
          <p>/</p>
          <a href="#">{userDetails.github}</a>
          <span className="profile-footer-icons">
            <FontAwesomeIcon icon={faLink} className="profile-icon" />
          </span>
          <a href="#">{userDetails.website}</a>
          <span className="profile-footer-icons">
            <FontAwesomeIcon icon={faCommentDots} className="profile-icon" />
          </span>
        </div>
      </div>
      <div className="profile-card-btn">
        <button className="profile-btn">Follow</button>
        <button className="profile-btn"><Link to={'/update'}>Update Profile</Link></button>
      </div>
      </div>
      <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" className="profile-photo"></img>
      <div className="user-details">
          <p className="user-details-p-name">{userDetails.firstname + " " + userDetails.lastname}</p>
          <p className="user-details-p">{'@' + userDetails.username}</p>
          <p className="user-details-p">{userDetails.bio}</p>
          <div className="user-reach">
          <p className="user-details-p-reach">200 followers</p>
          <p className="user-details-p-reach">200 following</p>
          </div>
      </div>
    </div>
  );
}
