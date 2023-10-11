import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Card.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Card({ userProfilePage, user, listed }) {
  const [projects, setProjects] = useState([]);

  console.log(user.workingOn);

  const { userId } = useParams();

  useEffect(() => {
    if (userProfilePage && listed) {
      // Fetch only user's projects
      axios
        .get(`http://localhost:5000/project/user/${userId}`) // Replace userId with the actual user ID
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user projects:", error);
        });
    } else if(userProfilePage && !listed) {
      axios.get(`http://localhost:5000/project/working/${userId}`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user projects:", error);
      });
    }else {
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
  }, [userProfilePage,listed]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  async function handleContinueRequest(
    projectName,
    projectId,
    developerUserId
  ) {
    const requesterUserName = sessionStorage.getItem("username");
    const requesterUserId = sessionStorage.getItem("id");

    try {
      await axios
        .post("http://localhost:5000/auth/request", {
          requesterUserName,
          projectName,
          developerUserId,
          projectId,
          requesterUserId,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Request sent succesfully");
            alert("Request sent");
          }
        })
        .catch((e) => {
          alert("Request could not be sent!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
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
              <button className="footer-r-button">
                <Link to={`/project/${project._id}`}>View More</Link>
              </button>
              <div className="footer-r">
                {user &&
                user.workingOn &&
                user.workingOn.includes(project._id) ? (
                  // User is working on the project
                  <button className="footer-r-button working-button">
                    Working
                  </button>
                ) : (
                  // User is not working on the project
                  <button
                    className="footer-r-button"
                    onClick={() =>
                      handleContinueRequest(
                        project.projectName,
                        project._id,
                        project.developerUserId
                      )
                    }
                  >
                    Request to continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
