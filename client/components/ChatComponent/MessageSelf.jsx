import React from "react";
import "./MessageSelf.css";

export default function MessageSelf({ content, time }) {

  function formatTime(dateString) {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  }
   // Split the time string to handle AM/PM
   const timeArray = time.split(' ');
   const formattedTime = formatTime(timeArray[0]);
   const amPm = timeArray[1];
  
  return (
    <div className="self-message-container">
      <div className="self-message-box">
        <p className="self-message-p">
          {content}
        </p>
        <div className="self-timeStamp">
          <p className="time">{formattedTime}</p>
          <span className="am-pm">{amPm}</span>
        </div>
      </div>
    </div>
  );
}
