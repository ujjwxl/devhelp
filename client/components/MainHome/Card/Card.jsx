import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Card.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Card({ userProfilePage }) {
  const [projects, setProjects] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    if (userProfilePage) {
      // Fetch only user's projects
      axios
        .get(`http://localhost:5000/project/user/${userId}`) // Replace userId with the actual user ID
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user projects:", error);
        });
    } else {
      // Fetch all projects
      axios
        .get("http://localhost:5000/project/all")
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }
  }, [userProfilePage]);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }  

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
              <a
                href={`/profile/${project.developerUserId}`}
                className="header-l-a"
              >
                {project.developerUserName}
              </a>

              <p className="header-l-p">/</p>
              <a href="" className="header-l-a">
                {project.projectName}
              </a>
            </div>

            <div className="header-r">
              <p className="header-date">{formatDate(project.createdAt)}</p>
              <span className="header-r-icons">
                <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
                <FontAwesomeIcon icon={faGithub} className="github-icon" />
              </span>
              <p className="header-r-p">{project.completionPercent + "%"}</p>
            </div>
          </div>

          <div className="card-content">
            <p className="card-content-p">{project.projectDescription}</p>
          </div>
          <div className="card-footer">
            <div className="footer-l">
              <p className="footer-l-p">{project.technologiesUsedOne}</p>
              <p className="footer-l-p">{project.technologiesUsedTwo}</p>
              <p className="footer-l-p">{project.technologiesUsedThree}</p>
            </div>
            <div className="footer-r">
              <button className="footer-r-button"><Link to={`/project/${project._id}`}>View More</Link></button>
              <button className="footer-r-button">Request to continue</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
