import React from 'react'
import Navbar from '../../components/MainHome/Navbar/Navbar'
import Sidebar from '../../components/MainHome/SideBar/SideBar'
import EditProfileComponent from '../../components/Profile/EditProfileComponent/EditProfileComponent'

const EditProfile = () => {
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
