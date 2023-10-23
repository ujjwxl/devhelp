import React from 'react'
import './MessageOthers.css'
export default function MessageOthers({ content, firstname, lastname }) {
  return (
    <div className="other-message-container">
      <div className='other-message-icon'>
        <p className=''>A</p>
      </div>
      <div className='other-message-box'>
        <h5 className='abc'>{firstname + " " + lastname}</h5>
        {/* <p className='other-message-p'>sbdfhbbwgbvinownnasfnsdjkvnsdvevnsdkldnd</p> */}
        <p className='other-message-p'>{content}</p>
        <p className="other-timeStamp">12:00am</p>
      </div>
    </div>
  )
}
