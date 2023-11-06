import React, { useState } from "react";
import "./AddProjectComponent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const AddProjectComponent = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGithub, setProjectGithub] = useState("");
  const [projectPercent, setProjectPercent] = useState("");
  const [projectNotes, setProjectNotes] = useState("");
  const [technologyOne, setTechnologyOne] = useState("");
  const [technologyTwo, setTechnologyTwo] = useState("");
  const [technologyThree, setTechnologyThree] = useState("");
  const [projectStatus, setProjectStatus] = useState("collaborate");

  const firstname = sessionStorage.getItem("firstname");
  const lastname = sessionStorage.getItem("lastname");
  const username = sessionStorage.getItem("username");
  const profile_picture = sessionStorage.getItem("profile_picture");
  const userId = sessionStorage.getItem("id");

  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/project/add", {
        projectName,
        projectStatus,
        projectDescription,
        projectGithub,
        projectPercent,
        projectNotes,
        technologyOne,
        technologyTwo,
        technologyThree,
        firstname,
        lastname,
        username,
        profile_picture,
        userId,
      });

      console.log("Project added successfully:", response.data);
      alert("Project added successfully");
      // Optionally, you can reset the form fields here
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="workspace">
      <div className="addProject">
        <h2 className="add-project-heading">Add your project</h2>

        <form action="POST" onSubmit={handleSubmit}>
          <h3 className="add-project-input-details">
            Give your project a name
          </h3>
          <input
            type="text"
            placeholder="Include name in this format : my-project"
            className="add-project"
            onChange={(e) => setProjectName(e.target.value)}
          />{" "}
          <br />
          <h3 className="add-project-input-details">Project Status</h3>
          <select
            value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)}
            className="add-project-select"
          >
            <option value="collaborate">Collaborate</option>
            <option value="abandoned">Abandoned</option>
          </select>
          <h3 className="add-project-input-details">
            Add a little description about your project
          </h3>
          <textarea
            cols={50}
            rows={8}
            type="text"
            placeholder="Keep it short and catchy"
            className="add-project-description"
            onChange={(e) => setProjectDescription(e.target.value)}
          />{" "}
          <br />
          <h3 className="add-project-input-details">Add GitHub repo link</h3>
          <input
            type="text"
            placeholder="Add GithHub link : github.com/user/repo"
            className="add-project"
            onChange={(e) => setProjectGithub(e.target.value)}
          />{" "}
          <br />
          <h3 className="add-project-input-details">
            How much of the project has already been completed?
          </h3>
          <input
            type="text"
            placeholder="Add project completion percent"
            className="add-project"
            onChange={(e) => setProjectPercent(e.target.value)}
          />{" "}
          <br />
          <h3 className="add-project-input-details">
            Give detailed description about your project, like challenges <br />{" "}
            or features to be added
          </h3>
          <textarea
            cols={50}
            rows={20}
            type="text"
            placeholder="Add project notes like challenges, completed, etc"
            className="add-project-notes"
            onChange={(e) => setProjectNotes(e.target.value)}
          />{" "}
          <br />
          <h3 className="add-project-input-details">
            Include three major tech stacks that you have used
          </h3>
          <input
            type="text"
            placeholder="Add a technology"
            className="add-project"
            onChange={(e) => setTechnologyOne(e.target.value)}
          />{" "}
          <br />
          <input
            type="text"
            placeholder="Add a technology"
            className="add-project"
            onChange={(e) => setTechnologyTwo(e.target.value)}
          />{" "}
          <br />
          <input
            type="text"
            placeholder="Add a technology"
            className="add-project"
            onChange={(e) => setTechnologyThree(e.target.value)}
          />{" "}
          <br />
          <button type="submit" className="add-project-button">
            Add project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectComponent;
