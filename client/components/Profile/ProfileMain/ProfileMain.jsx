import React from 'react'
import "./ProfileMain.css"
import ProfileCard from '../ProfileCard/ProfileCard'
import Card from "../../MainHome/Card/Card"

export default function ProfileMain() {
  return (
    <div className='workspace'>
      {/* <h1 className='ws-h1'>Welcome back, Varun</h1>
      <p className='ws-p'>Featured Projects</p> */}
      <div className='ws-card'>
        <ProfileCard></ProfileCard>
        <Card></Card>
      </div>
    </div>
  )
}
