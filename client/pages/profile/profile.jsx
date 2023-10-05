import React from 'react'
import Navbar from "../../components/MainHome/Navbar/Navbar"
import Sidebar from "../../components/MainHome/SideBar/SideBar"
import ProfileMain from "../../components/Profile/ProfileMain/ProfileMain"
import './Profile.css'

export default function Profile() {
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
