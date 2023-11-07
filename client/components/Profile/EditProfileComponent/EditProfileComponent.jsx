import React, { useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone';
import './EditProfileComponent.css'

const EditProfileComponent = () => {

  // const [firstname, setFirstName] = useState('');
  // const [lastname, setLastName] = useState('');
  // const [username, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [github, setGitHub] = useState('');
  const [website, setWebsite] = useState('');
  const [technologyOne, setTechnologyOne] = useState('');
  const [technologyTwo, setTechnologyTwo] = useState('');
  const [technologyThree, setTechnologyThree] = useState('');

  const [profilePicture, setProfilePicture] = useState(null); // Store the selected profile picture

  const userId = sessionStorage.getItem('id');

  const onDrop = (acceptedFiles) => {
    // Handle the dropped file(s) here
    if (acceptedFiles.length > 0) {
      setProfilePicture(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Accept only image files
    multiple: false, // Allow only one file at a time
  });

  //   const firstname = sessionStorage.getItem('firstname');
  //   const lastname = sessionStorage.getItem('lastname');
  //   const username = sessionStorage.getItem('username');
  //   const profile_picture = sessionStorage.getItem('profile_picture');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profile_picture = profilePicture.name;

    try {
      const response = await axios.patch('http://localhost:5000/auth/update', {
        bio, github, website, technologyOne, technologyTwo, technologyThree, userId, profile_picture
      });

      console.log('Profile updated successfully:', response.data);
      alert("profile added successfully")
      // Optionally, you can reset the form fields here
    } catch (error) {
      console.error('Error updating profile:', error);
    }

    try {

      const formData = new FormData();
      formData.append("profilePicture", profilePicture);

      const result = await axios.post(
        "http://localhost:5000/auth/image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
    } catch (e) {
      console.log(e)
    }
  };


  return (
    <div className='workspace'>

      <h2>Update your profile</h2>

      <form action="POST" onSubmit={handleSubmit}>
        <input type="text" placeholder="Add/update your bio" className="add-project" onChange={(e) => setBio(e.target.value)} /> <br />
        <input type="text" placeholder="Add GithHub link : github.com/user" className="add-project" onChange={(e) => setGitHub(e.target.value)} /> <br />
        <input type="text" placeholder="Add your website" className="add-project" onChange={(e) => setWebsite(e.target.value)} /> <br />
        <input type="text" placeholder="Add a technology" className="add-project" onChange={(e) => setTechnologyOne(e.target.value)} /> <br />
        <input type="text" placeholder="Add a technology" className="add-project" onChange={(e) => setTechnologyTwo(e.target.value)} /> <br />
        <input type="text" placeholder="Add a technology" className="add-project" onChange={(e) => setTechnologyThree(e.target.value)} /> <br />

        {/* <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {profilePicture ? (
            <p>Selected Profile Picture: {profilePicture.name}</p>
          ) : (
            <p>Drag & drop your profile picture here, or click to select one</p>
          )}
        </div> */}

        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {profilePicture ? (
            <div>
              <p>Selected Profile Picture: {profilePicture.name}</p>
              <img
                src={URL.createObjectURL(profilePicture)} // Display the selected image
                alt="Profile Preview"
                className="profile-picture-preview"
              />
            </div>
          ) : (
            <p>Drag & drop your profile picture here, or click to select one</p>
          )}
        </div>

        <button type='submit' className='add-project-button'>Add project</button>
      </form>
    </div>
  )
}

export default EditProfileComponent
