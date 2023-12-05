import React from 'react'
import axios from 'axios'
import Navbar from '../../components/MainHome/Navbar/Navbar'
import SideBar from '../../components/MainHome/SideBar/SideBar'
import ChatArea from '../../components/ChatComponent/ChatArea'
import './Chat.css'

export default function Chat() {

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
        <>
            <Navbar></Navbar>
            <div className='main-home'>
                <div className='home-side-bar'>
                    <SideBar></SideBar>
                </div>
                <div className='home-work-space'>
                    <ChatArea></ChatArea>
                </div>
            </div>
        </>
    )
}
