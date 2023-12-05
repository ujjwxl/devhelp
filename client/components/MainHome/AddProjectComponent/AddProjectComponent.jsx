import React, { useState } from "react";
import "./AddProjectComponent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDropzone } from 'react-dropzone';

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

  const [images, setImages] = useState([]);
  const [projectImages, setProjectImages] = useState({
    projectImage1: null,
    projectImage2: null,
    projectImage3: null,
  });

  const firstname = sessionStorage.getItem("firstname");
  const lastname = sessionStorage.getItem("lastname");
  const username = sessionStorage.getItem("username");
  const profile_picture = sessionStorage.getItem("profile_picture");
  const userId = sessionStorage.getItem("id");

  const onDrop = (acceptedFiles) => {
    // Store up to three images in the 'images' state
    setImages(acceptedFiles.slice(0, 3));

    // Map the images to the projectImages state
    acceptedFiles.slice(0, 3).forEach((file, index) => {
      const key = `projectImage${index + 1}`;
      setProjectImages((prevImages) => ({
        ...prevImages,
        [key]: file,
      }));
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
    multiple: true,
    maxFiles: 3,
  });


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const project_image_one = projectImages.projectImageOne.name;
    // const project_image_two = projectImages.projectImageTwo.name;
    // const project_image_three = projectImages.projectImageThree.name; 

    const project_image_one = projectImages.projectImage1 ? projectImages.projectImage1.name : null;
    const project_image_two = projectImages.projectImage2 ? projectImages.projectImage2.name : null;
    const project_image_three = projectImages.projectImage3 ? projectImages.projectImage3.name : null;

    const projectImagesArray = []; // Create an array to store project images

    const formData = new FormData();

    for (let i = 1; i <= 3; i++) {
      const key = `projectImage${i}`;
      const file = projectImages[key];
      if (file) {
        // projectImagesArray.push(file); // Add the file to the array
        formData.append(`projectImagesArray`, file);
      }
    }

    console.log(projectImagesArray)

    console.log(project_image_one)

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
        project_image_one,
        project_image_two,
        project_image_three
      });

      console.log("Project added successfully:", response.data);
      alert("Project added successfully");
      // Optionally, you can reset the form fields here
    } catch (error) {
      alert("Project could not be added")
      console.error("Error adding project:", error);
    }

    try {
      // const formData = new FormData();

      // Append all three images to the formData
      // for (let i = 1; i <= 3; i++) {
      //   const key = `projectImage${i}`;
      //   const file = projectImages[key];
      //   if (file) {
      //     formData.append(key, file);
      //   }
      // }

      // formData.append("projectImagesArray", projectImagesArray)

      const result = await axios.post('http://localhost:5000/project/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Images uploaded successfully:', result.data);
    } catch (error) {
      console.error('Image upload failed:', error);
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

          <div {...getRootProps()} className="dropzone">
            {/* <input {...getInputProps()} name="projectImages"/> */}
            <input {...getInputProps({ name: "projectImages" })} />
            <p>Drag and drop images here, or click to select files (up to 3).</p>
          </div>
          <div className="uploaded-images">
            {images.map((file, index) => (
              <div key={index} className="image-preview">
                <img src={URL.createObjectURL(file)} alt={`Image ${index + 1}`} className="add-project-uploaded-image" />
              </div>
            ))}
          </div>

          <button type="submit" className="add-project-button">
            Add project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProjectComponent;
