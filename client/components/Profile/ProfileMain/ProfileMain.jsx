import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import "./ProfileMain.css"
import ProfileCard from '../ProfileCard/ProfileCard'
import Card from "../../MainHome/Card/Card"

export default function ProfileMain() {

  const [user, setUser] = useState({});
  const [myProject, setMyProject] = useState(true);
  const userId = sessionStorage.getItem('id');

  useEffect(() => {
    axios.post("http://localhost:5000/auth/find", { userId })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const toggleMyProject = () => {
    setMyProject(true);
  }

  const toggleMyWorking = () => {
    setMyProject(false);
  }

  return (
    <div className='workspace'>
      <div className='ws-card'>
        <ProfileCard></ProfileCard>
        <div className="profile-main-buttons">
          <button onClick={toggleMyProject} className='profile-main-btn'>Listed</button>
          <button onClick={toggleMyWorking} className='profile-main-btn'>Working On</button>
        </div>

        <Card userProfilePage={true} user={user} listed={myProject} />
      </div>
    </div>
  )
}
