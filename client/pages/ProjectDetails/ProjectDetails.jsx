import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/MainHome/Navbar/Navbar';
import Sidebar from '../../components/MainHome/SideBar/SideBar';
import ProjectDetailsComponent from "../../components/MainHome/ProjectDetailsComponent/ProjectDetailsComponent"

const ProjectDetails = () => {

    return (
        <div>
            <Navbar/>
            <div className='main-home'>
                <div className='home-side-bar'>
                    <Sidebar></Sidebar>
                </div>
                <div className='home-work-space'>
                    <ProjectDetailsComponent></ProjectDetailsComponent>
                </div>

            </div>
        </div>
    )
}

export default ProjectDetails
