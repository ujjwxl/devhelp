// import React from 'react'
// import './MessageOthers.css'
// export default function MessageOthers({ content, firstname, lastname, time }) {

//   function formatTime(dateString) {
//     const options = { hour: "2-digit", minute: "2-digit" };
//     return new Date(dateString).toLocaleTimeString(undefined, options);
//   }
  
//   return (
//     <div className="other-message-container">
//       <div className='other-message-icon'>
//         <p className=''>{firstname.charAt(0)}</p>
//       </div>
//       <div className='other-message-box'>
//         {/* <h5 className='abc'>{firstname + " " + lastname}</h5> */}
//         {/* <p className='other-message-p'>sbdfhbbwgbvinownnasfnsdjkvnsdvevnsdkldnd</p> */}
//         <p className='other-message-p'>{content}</p>
//         {/* <p className="other-timeStamp">{formatTime(time)}</p> */}
//         <div className="other-timeStamp">
//           <p className="time">{formatTime(time)}</p>
//           <span className="am-pm">{time.slice(-2)}</span>
//         </div>
//       </div>
//     </div>
//   )
// }
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
        {/* <p className=''>{firstname.charAt(0)}</p> */}
        <p className=''>{firstname ? firstname.charAt(0) : ''}</p>
      </div>
      <div className='other-message-box'>
        {/* <h5 className='abc'>{firstname + " " + lastname}</h5> */}
        {/* <p className='other-message-p'>sbdfhbbwgbvinownnasfnsdjkvnsdvevnsdkldnd</p> */}
        <p className='other-message-p'>{content}</p>
        {/* <p className="other-timeStamp">{formatTime(time)}</p> */}
        <div className="other-timeStamp">
          <p className="time">{formattedTime}</p>
          <span className="am-pm">{amPm}</span>
        </div>
      </div>
    </div>
  )
}
