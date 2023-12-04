import React from 'react'
import Navbar from '../../components/MainHome/Navbar/Navbar'
import Sidebar from '../../components/MainHome/SideBar/SideBar'
import EditProfileComponent from '../../components/Profile/EditProfileComponent/EditProfileComponent'
import { Link } from 'react-router-dom'
import computerImage from '../../src/assets/computer-devhelp.png'
import './NotFound.css'

const NotFound = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <div className='main-home'>
                <div className='home-side-bar'>
                    {/* <Sidebar></Sidebar> */}
                </div>
                <div className='home-work-space not-found-page'>
                    <h2>Looks like this page was abandoned!</h2>
                    <h2>(pun totally intended xD)</h2>
                    <h1>404! T T</h1>
                    <img src={computerImage} alt="" className='computer-image' /> <br/>
                    <Link to={'/home'}><button>Explore our website</button></Link>
                </div>

            </div>
        </div>
    )
}

export default NotFound
