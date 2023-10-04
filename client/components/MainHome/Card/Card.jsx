import React, { useState, useEffect } from "react";
import "./Card.css";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Card() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/project/all')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);
  // client\src\assets\default-pfp.png
  return (
    <div>
      {projects.map((project) => (
        <div className="card" key={project._id}>
          <div className="card-header">
            <div className="header-l">
              <img
                // src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                src={`../../../src/assets/` + project.developerProfilePicture}
                className="header-l-img"
                alt="profile"
              />
              <a href="" className="header-l-a">
                {project.developerUserId}
              </a>
              <p className="header-l-p">/</p>
              <a href="" className="header-l-a">
                {project.projectName}
              </a>
            </div>

            <div className="header-r">
              <p className="header-date">04 October 2023</p>
              <span className="header-r-icons">
                <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
                <FontAwesomeIcon icon={faGithub} className="github-icon" />
              </span>
              <p className="header-r-p">{project.completionPercent + '%'}</p>
            </div>
          </div>

          <div className="card-content">
            <p className="card-content-p">
              {project.projectDescription}
            </p>
          </div>
          <div className="card-footer">
            <div className="footer-l">
              <p className="footer-l-p">{project.technologiesUsedOne}</p>
              <p className="footer-l-p">{project.technologiesUsedTwo}</p>
              <p className="footer-l-p">{project.technologiesUsedThree}</p>
            </div>
            <div className="footer-r">
              <button className="footer-r-button">View More</button>
              <button className="footer-r-button">Request to continue</button>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
