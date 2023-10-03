import React from 'react'
import Navbar from '../../components/MainHome/Navbar/Navbar'
import SideBar from '../../components/MainHome/SideBar/SideBar'
import Workspace from '../../components/MainHome/Workspace/Workspace'
export default function MainHome() {
    return(
        <>
        <div > 
            <Navbar></Navbar>
            <SideBar></SideBar>
            <Workspace></Workspace>
        </div>
        </> 
    )
}
