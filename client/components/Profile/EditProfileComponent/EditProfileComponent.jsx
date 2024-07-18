import React, { useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone';
import './EditProfileComponent.css'

const EditProfileComponent = () => {

  const [bio, setBio] = useState('');
  const [github, setGitHub] = useState('');
  const [website, setWebsite] = useState('');
  const [technologyOne, setTechnologyOne] = useState('');
  const [technologyTwo, setTechnologyTwo] = useState('');
  const [technologyThree, setTechnologyThree] = useState('');

  const [profilePicture, setProfilePicture] = useState(null);

  const userId = sessionStorage.getItem('id');

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setProfilePicture(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Accept only image files
    multiple: false, // Allow only one file at a time
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profile_picture = null

    if (profilePicture) {
      profile_picture = profilePicture.name;
    }


    try {
      const response = await axios.patch('http://localhost:5000/auth/update', {
        bio, github, website, technologyOne, technologyTwo, technologyThree, userId, profile_picture
      });

      console.log('Profile updated successfully:', response.data);
      alert("profile added successfully")
    } catch (error) {
      console.error('Error updating profile:', error);
    }

    try {

      const formData = new FormData();
      formData.append("profilePicture", profilePicture);

      const result = await axios.post(
        `http://localhost:5000/auth/image/${userId}`,
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

      <h2 className='add-project-heading'>Update your profile</h2>

      <form action="POST" onSubmit={handleSubmit}>
        <input type="text" placeholder="Add/update your bio" className="add-project" onChange={(e) => setBio(e.target.value)} /> <br />
        <input type="text" placeholder="Add GithHub username" className="add-project" onChange={(e) => setGitHub(e.target.value)} /> <br />
        <input type="text" placeholder="Add your website" className="add-project" onChange={(e) => setWebsite(e.target.value)} /> <br />
        <input type="text" placeholder="Add a technology" className="add-project" onChange={(e) => setTechnologyOne(e.target.value)} /> <br />
        <input type="text" placeholder="Add a technology" className="add-project" onChange={(e) => setTechnologyTwo(e.target.value)} /> <br />
        <input type="text" placeholder="Add a technology" className="add-project" onChange={(e) => setTechnologyThree(e.target.value)} /> <br />

        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {profilePicture ? (
            <div>
              <p>Selected Profile Picture: {profilePicture.name}</p>
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile Preview"
                className="profile-picture-preview"
              />
            </div>
          ) : (
            <p>Drag & drop your profile picture here, or click to select one</p>
          )}
        </div>

        <button type='submit' className='add-project-button'>Update Profile</button>
      </form>
    </div>
  )
}

export default EditProfileComponent
