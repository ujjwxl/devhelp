import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Card.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { format, render, cancel, register } from 'timeago.js';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';

export default function Card({ userProfilePage, user, listed, saved, isAbandoned, toCollaborate }) {
  const [projects, setProjects] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    if (saved) {
      const loggedInUserId = sessionStorage.getItem("id");

      axios
        .get(`http://localhost:5000/project/saved/${loggedInUserId}`)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user projects:", error);
        });
    }
    else if (userProfilePage && listed) {
      axios
        .get(`http://localhost:5000/project/user/${userId}`)
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
  }, [userProfilePage, listed, isAbandoned, toCollaborate, userId]);

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

  function getCompletionClass(completionPercent) {
    if (completionPercent > 70) {
      return 'green';
    } else if (completionPercent >= 40 && completionPercent <= 69) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  const myCld = new Cloudinary({
    cloud: {
      cloudName: "dv2z4lhfz",
    },
  });

  return (
    <div>
      {projects.length === 0 ? (
        <p className="add-project-heading">No projects found.</p>
      ) : (
        projects.map((project, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <div className="header-l">
                <Link to={`/profile/${project.developerUserId?._id}`}><AdvancedImage
                  cldImg={myCld.image(project.developerUserId?.profile_picture)}
                  className="header-l-img"
                  alt="profile"
                /></Link>


                <Link to={`/profile/${project.developerUserId?._id}`} className="header-l-a">
                  {project.developerUserName}
                </Link>

                <p className="header-l-p">/</p>

                <Link to={`/project/${project._id}`} className="header-l-a">
                  {project.projectName}
                </Link>
              </div>

              <div className="header-r">
                <p className="header-date">{format(project.createdAt)}</p>
                <span className="header-r-icons">
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="bookmark-icon"
                    onClick={() => saveProject(project._id)}
                  />
                  <a href={project.projectGithubLink} target="__blank"><FontAwesomeIcon icon={faGithub} className="github-icon" /></a>
                </span>
                <p className={`header-r-p ${getCompletionClass(project.completionPercent)}`}>
                  {project.completionPercent + "%"}
                </p>
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

              <div className="footer-r"><Link to={`/project/${project._id}`}>
                <button className="footer-r-button no-decor">
                  View More
                </button></Link>
                <div className="footer-r">
                  {user &&
                    user._id !== project.developerUserId?._id && (
                      // User is not the owner of the project
                      <>
                        {user.workingOn &&
                          user.workingOn.includes(project._id) ? (
                          // User is already working on the project
                          <button className="footer-r-button working-button">
                            Working
                          </button>
                        ) : project.projectStatus === "collaborate" ? (
                          <button
                            className="footer-r-button"
                            onClick={() =>
                              handleContinueRequest(
                                project.projectName,
                                project._id,
                                project.developerUserId?._id
                              )
                            }
                          >
                            Request to collaborate
                          </button>
                        ) : project.projectStatus === "abandoned" ? (
                          <button
                            className="footer-r-button"
                            onClick={() =>
                              handleContinueRequest(
                                project.projectName,
                                project._id,
                                project.developerUserId?._id
                              )
                            }
                          >
                            Request to continue
                          </button>
                        ) : null}
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
