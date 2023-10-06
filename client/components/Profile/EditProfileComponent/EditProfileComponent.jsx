import React, { useState } from 'react'
import axios from 'axios'

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

  const userId = sessionStorage.getItem('id');

//   const firstname = sessionStorage.getItem('firstname');
//   const lastname = sessionStorage.getItem('lastname');
//   const username = sessionStorage.getItem('username');
//   const profile_picture = sessionStorage.getItem('profile_picture');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch('http://localhost:5000/auth/update', {
        bio, github, website, technologyOne, technologyTwo, technologyThree, userId
      });

      console.log('Profile updated successfully:', response.data);
      alert("profile added successfully")
      // Optionally, you can reset the form fields here
    } catch (error) {
      console.error('Error updating profile:', error);
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
        <button type='submit' className='add-project-button'>Add project</button>
      </form> 
    </div>
  )
}

export default EditProfileComponent
