import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/MainHome/Navbar/Navbar';
import Sidebar from '../../components/MainHome/SideBar/SideBar';
import AddProjectComponent from '../../components/MainHome/AddProjectComponent/AddProjectComponent';

const AddProject = () => {

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectGithub, setProjectGithub] = useState('');
    const [projectPercent, setProjectPercent] = useState('');

    

    return (
        <div>
            <Navbar/>
            <div className='main-home'>
                <div className='home-side-bar'>
                    <Sidebar></Sidebar>
                </div>
                <div className='home-work-space'>
                    <AddProjectComponent></AddProjectComponent>
                </div>

            </div>
        </div>
    )
}

export default AddProject