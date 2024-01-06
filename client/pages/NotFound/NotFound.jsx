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
                    <div className="not-found-page-left">
                        <h2>Uh oh!, looks like this page was abandoned!</h2>
                        <h2>(pun totally intended xD)</h2>
                        <h1>404! T T</h1>
                    </div>
                    <div className="not-found-page-right">
                        <img src={computerImage} alt="" className='computer-image' /> <br />
                        <Link to={'/home'}><button>Explore our website</button></Link>
                    </div>

                </div>

            </div>
            <p className='not-found-page-copyright-text'>© 2024 DevHelp, Inc.</p>
        </div>
    )
}

export default NotFound
