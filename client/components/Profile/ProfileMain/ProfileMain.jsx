import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import "./ProfileMain.css"
import ProfileCard from '../ProfileCard/ProfileCard'
import Card from "../../MainHome/Card/Card"

export default function ProfileMain() {

  const [user, setUser] = useState({});
  const [myProject, setMyProject]= useState(true);
  const userId=sessionStorage.getItem('id');

  useEffect(() => {
    axios.post("http://localhost:5000/auth/find", { userId })
      .then((response) => {
        // console.log(response)
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const toggleMyProject = () =>{
    setMyProject(true);
  }

  const toggleMyWorking = () => {
    setMyProject(false);
  }

  return (
    <div className='workspace'>
      {/* <h1 className='ws-h1'>Welcome back, Varun</h1>
      <p className='ws-p'>Featured Projects</p> */}
      <div className='ws-card'>
        <ProfileCard></ProfileCard>
        <button onClick={toggleMyProject}>My projects</button>
        <button onClick={toggleMyWorking}>Working On</button>
        <Card userProfilePage={true} user={user} listed={myProject} />
      </div>
    </div>
  )
}
