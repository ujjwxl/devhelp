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
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import Navbar from '../../components/MainHome/Navbar/Navbar';
import SideBar from '../../components/MainHome/SideBar/SideBar';
import Workspace from '../../components/MainHome/Workspace/Workspace';
import Abandon from '../../components/MainHome/Collab_Abandon/Abandoned';
import Collaborate from '../../components/MainHome/Collab_Abandon/Collaborate';
import './MainHome.css';

export default function MainHome() {

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

  // Get the current location (route)
  const location = useLocation();

  // const myCld = new Cloudinary({
  //   cloud: {
  //     cloudName: "dv2z4lhfz",
  //   },
  // });
  
  // let img = myCld.image('vqdgtvmbmcgmpg8fs2pe');

  return (
    <>
      <Navbar />
      {/* <AdvancedImage cldImg={img}/> */}
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
