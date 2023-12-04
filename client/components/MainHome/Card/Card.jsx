import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Card.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Card({ userProfilePage, user, listed, saved, isAbandoned, toCollaborate }) {
  const [projects, setProjects] = useState([]);

  // console.log(user.workingOn);

  const { userId } = useParams();

  useEffect(() => {
    if (saved) {
      const loggedInUserId = sessionStorage.getItem("id");

      axios
        .get(`http://localhost:5000/project/saved/${loggedInUserId}`) // Replace userId with the actual user ID
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user projects:", error);
        });
    }
    else if (userProfilePage && listed) {
      // Fetch only user's projects
      axios
        .get(`http://localhost:5000/project/user/${userId}`) // Replace userId with the actual user ID
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching saved projects:", error);
        });
    } else if (userProfilePage && !listed) {
      axios
        .get(`http://localhost:5000/project/working/${userId}`)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user projects:", error);
        });
    } else if (isAbandoned) {
      // Fetch only abandoned projects
      axios
        .get("http://localhost:5000/project/abandoned")
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching abandoned projects:", error);
        });
    }
    else if (toCollaborate) {
      // Fetch only abandoned projects
      axios
        .get("http://localhost:5000/project/collab")
        .then((response) => {
          setProjects(response.data);
          console.log(projects);
        })
        .catch((error) => {
          console.error("Error fetching collaborate projects:", error);
        });
    }

    else {
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
  }, [userProfilePage, listed, isAbandoned, toCollaborate]);

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

  async function saveProject(projectId) {
    const loggedInUserId = sessionStorage.getItem("id");

    try {
      await axios
        .post("http://localhost:5000/project/save", {
          loggedInUserId,
          projectId,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Project saved successfully");
            alert("Project saved");
          }
        })
        .catch((e) => {
          alert("Project could not be saved!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const handleProfileClick = (profileLink) => {
    window.location.href = profileLink;
  };
  // client\src\assets\default-pfp.png
  return (
    <div>
      {projects.map((project) => (
        <div className="card" key={project._id}>
          <div className="card-header">
            <div className="header-l">
              <img
                // src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                // src={`../../../src/assets/` + project.developerProfilePicture}
                src={`http://localhost:5000/assets/` + project.developerProfilePicture}
                onClick={() => handleProfileClick(`/profile/${project.developerUserId}`)}
                className="header-l-img"
                alt="profile"
              />
              {/* <a
                href={`/profile/${project.developerUserId}`}
                className="header-l-a"
              >
                {project.developerUserName}
              </a> */}

              <Link to={`/profile/${project.developerUserId}`} className="header-l-a">
                {project.developerUserName}
              </Link>

              <p className="header-l-p">/</p>
              {/* <a href="" className="header-l-a">
                {project.projectName}
              </a> */}

              <Link to={`/project/${project._id}`} className="header-l-a">
                {project.projectName}
              </Link>
            </div>

            <div className="header-r">
              <p className="header-date">{formatDate(project.createdAt)}</p>
              <span className="header-r-icons">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="bookmark-icon"
                  onClick={() => saveProject(project._id)}
                />
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
            {/* <div className="footer-r">
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
            </div> */}

            <div className="footer-r">
              <button className="footer-r-button no-decor">
                <Link to={`/project/${project._id}`}>View More</Link>
              </button>
              <div className="footer-r">
                {user &&
                  user.workingOn &&
                  user.workingOn.includes(project._id) ? (
                  // User is already working on the project
                  <button className="footer-r-button working-button">
                    Working
                  </button>
                ) : project.projectStatus === "collaborate" ? (
                  // Display "Request to collaborate" for projects with projectStatus "collaborate"
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
                    Request to collaborate
                  </button>
                ) : project.projectStatus === "abandoned" ? (
                  // Display "Request to continue" for projects with projectStatus "abandon"
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
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
