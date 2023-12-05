import React from 'react'
import axios from 'axios'
import Navbar from '../../components/MainHome/Navbar/Navbar'
import Sidebar from '../../components/MainHome/SideBar/SideBar'
import EditProfileComponent from '../../components/Profile/EditProfileComponent/EditProfileComponent'

const EditProfile = () => {

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
        <div>
            <Navbar />
            <div className='main-home'>
                <div className='home-side-bar'>
                    <Sidebar></Sidebar>
                </div>
                <div className='home-work-space'>
                    <EditProfileComponent/>
                </div>

            </div>
        </div>
    )
}

export default EditProfile
