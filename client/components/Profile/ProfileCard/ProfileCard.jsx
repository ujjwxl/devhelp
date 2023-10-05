import React from "react";
import "./ProfileCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink, faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function ProfileCard() {
  return (
    <div className="profile-card">
      <img
        className="profile-cover"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_DH5SrhMqR_a1X-CAeXcV0m4GINEEhEPytA&usqp=CAU"
      ></img>
      <div className="profile-card-link-btn">
      <div className="profile-card-footer">
        <div className="profile-techstack">
          <p className="profile-card-techstack">React</p>
          <p className="profile-card-techstack">HTML</p>
          <p className="profile-card-techstack">CSS</p>
        </div>

        <div className="profile-links">
          <span className="profile-footer-icons">
            <FontAwesomeIcon icon={faGithub} className="profile-icon" />
          </span>
          <p>/</p>
          <a href="#">billo</a>
          <span className="profile-footer-icons">
            <FontAwesomeIcon icon={faLink} className="profile-icon" />
          </span>
          <a href="#">billiyan.com</a>
          <span className="profile-footer-icons">
            <FontAwesomeIcon icon={faCommentDots} className="profile-icon" />
          </span>
        </div>
      </div>
      <div className="profile-card-btn">
        <button className="profile-btn">View More</button>
        <button className="profile-btn">Request to continue</button>
      </div>
      </div>
      <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" className="profile-photo"></img>
      <div className="user-details">
          <p className="user-details-p-name">Billo Bagge</p>
          <p className="user-details-p">@kikarengi</p>
          <p className="user-details-p">I am a senior software developer at Microsoft and I love Devhelp for the power it provides.</p>
          <div className="user-reach">
          <p className="user-details-p-reach">200 followers</p>
          <p className="user-details-p-reach">200 following</p>
          </div>
      </div>
    </div>
  );
}
