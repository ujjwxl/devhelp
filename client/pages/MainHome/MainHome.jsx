import React from 'react'
import Navbar from '../../components/MainHome/Navbar/Navbar'
import SideBar from '../../components/MainHome/SideBar/SideBar'
import Workspace from '../../components/MainHome/Workspace/Workspace'
import './MainHome.css'

export default function MainHome() {
    return(
        <>
        <Navbar></Navbar>
        <div className='main-home'> 
            <SideBar></SideBar>
            <Workspace></Workspace>
        </div>
        </> 
    )
}
