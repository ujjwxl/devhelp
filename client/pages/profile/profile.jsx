import React from 'react'
import axios from 'axios'
import Navbar from "../../components/MainHome/Navbar/Navbar"
import Sidebar from "../../components/MainHome/SideBar/SideBar"
import ProfileMain from "../../components/Profile/ProfileMain/ProfileMain"
import './Profile.css'

export default function Profile() {

  const token = sessionStorage.getItem('token')


    //setting the authorisation token in the header
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };
    setAuthToken(token);

  return (
    <>
    <Navbar></Navbar>
    <div className='main-home'>
        <div className='home-side-bar'>
            <Sidebar></Sidebar>
        </div>
        <div className='home-work-space'>
            <ProfileMain></ProfileMain>
        </div>

    </div>
</>
  )
}
