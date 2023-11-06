// import React from 'react'
// import Navbar from '../../components/MainHome/Navbar/Navbar'
// import SideBar from '../../components/MainHome/SideBar/SideBar'
// import Workspace from '../../components/MainHome/Workspace/Workspace'
// import Abandoned from '../../components/MainHome/AbandonedComponent/AbandonedComponent'
// import './MainHome.css'

// export default function MainHome() {
//     return (
//         <>
//             <Navbar></Navbar>
//             <div className='main-home'>
//                 <div className='home-side-bar'>
//                     <SideBar></SideBar>
//                 </div>
//                 <div className='home-work-space'>
//                 {location.pathname === 'http://localhost:5173/home' ? <Workspace /> : null}
//                 {location.pathname === '/abandoned' ? <Abandoned /> : null}
//                 </div>

//             </div>
//         </>
//     )
// }
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/MainHome/Navbar/Navbar';
import SideBar from '../../components/MainHome/SideBar/SideBar';
import Workspace from '../../components/MainHome/Workspace/Workspace';
import Abandon from '../../components/MainHome/AbandonedComponent/AbandonedComponent';
import Collaborate from '../../components/MainHome/AbandonedComponent/Collaborate';
import './MainHome.css';

export default function MainHome() {
  // Get the current location (route)
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="main-home">
        <div className="home-side-bar">
          <SideBar />
        </div>
        <div className="home-work-space">
          {/* Conditionally render Workspace or Abandoned based on the route */}
          {location.pathname === '/home' ? <Workspace /> : null}
          {location.pathname === '/abandon' ? <Abandon /> : null}
          {location.pathname === '/collaborate' ? <Collaborate /> : null}
        </div>
      </div>
    </>
  );
}
