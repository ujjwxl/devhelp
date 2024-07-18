import React from 'react';
import './MessageOthers.css';

export default function MessageOthers({ content, firstname, lastname, time }) {

  function formatTime(dateString) {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  }

  // Split the time string to handle AM/PM
  const timeArray = time.split(' ');
  const formattedTime = formatTime(timeArray[0]);
  const amPm = timeArray[1];

  return (
    <div className="other-message-container">
      <div className='other-message-icon'>
        <p className=''>{firstname ? firstname.charAt(0) : ''}</p>
      </div>
      <div className='other-message-box'>
        <p className='other-message-p'>{content}</p>
        <div className="other-timeStamp">
          <p className="time">{formattedTime}</p>
          <span className="am-pm">{amPm}</span>
        </div>
      </div>
    </div>
  )
}
