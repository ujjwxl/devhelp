import React from 'react'
import Navbar from '../../components/MainHome/Navbar/Navbar'
import SideBar from '../../components/MainHome/SideBar/SideBar'
import ChatArea from '../../components/ChatComponent/ChatArea'
import './Chat.css'

export default function Chat() {
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
