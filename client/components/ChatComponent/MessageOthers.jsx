import React from 'react'
import './MessageOthers.css'
export default function MessageOthers({ content, firstname, lastname, time }) {

  function formatTime(dateString) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  }
  
  return (
    <div className="other-message-container">
      <div className='other-message-icon'>
        <p className=''>A</p>
      </div>
      <div className='other-message-box'>
        <h5 className='abc'>{firstname + " " + lastname}</h5>
        {/* <p className='other-message-p'>sbdfhbbwgbvinownnasfnsdjkvnsdvevnsdkldnd</p> */}
        <p className='other-message-p'>{content}</p>
        <p className="other-timeStamp">{formatTime(time)}</p>
      </div>
    </div>
  )
}
