import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/MainHome/Navbar/Navbar';
import Sidebar from '../../components/MainHome/SideBar/SideBar';
import ProjectDetailsComponent from "../../components/MainHome/ProjectDetailsComponent/ProjectDetailsComponent"
import SavedProjectsComponent from '../../components/MainHome/SavedProjectsComponent/SavedProjectsComponent';

const SavedProjects = () => {

    return (
        <div>
            <Navbar/>
            <div className='main-home'>
                <div className='home-side-bar'>
                    <Sidebar></Sidebar>
                </div>
                <div className='home-work-space'>
                    <SavedProjectsComponent></SavedProjectsComponent>
                </div>

            </div>
        </div>
    )
}

export default SavedProjects
