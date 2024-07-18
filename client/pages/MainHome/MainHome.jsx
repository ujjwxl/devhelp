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
