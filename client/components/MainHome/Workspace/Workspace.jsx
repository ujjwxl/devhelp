import React from 'react'
import './Workspace.css'
import Card from '../Card/Card'

export default function Workspace() {
  return (
    <div className='workspace'>
      <h1 className='ws-h1'>Welcome back, Varun</h1>
      <p className='ws-p'>Featured Projects</p>
      <div className='ws-card'>
        <Card userProfilePage={false} />
      </div>
    </div>
  )
}
