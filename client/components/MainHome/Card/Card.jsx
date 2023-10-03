import React from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Card() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="header-l">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
            className="header-l-img"
            alt="profile"
          />
          <a href="" className="header-l-a">
            abc
          </a>
          <p className="header-l-p">/</p>
          <a href="" className="header-l-a">
            tic-tac-toe
          </a>
        </div>

        <div className="header-r">
          <p className="header-date">04 October 2023</p>
          <span className="header-r-icons">
            <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
            <FontAwesomeIcon icon={faGithub} className="github-icon" />
          </span>
          <p className="header-r-p">80%</p>
        </div>
      </div>

      <div className="card-content">
        <p className="card-content-p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type
        </p>
      </div>
      <div className="card-footer">
        <div className="footer-l">
            <p className="footer-l-p">Javascript</p>
            <p className="footer-l-p">Python</p>
            <p className="footer-l-p">React</p>
        </div>
        <div className="footer-r">
            <button className="footer-r-button">View More</button>
            <button className="footer-r-button">Request to continue</button>
        </div>
      </div>
    </div>
  );
}
