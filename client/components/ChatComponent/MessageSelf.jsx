import React from "react";
import "./MessageSelf.css";

export default function MessageSelf() {
  return (
    <div className="self-message-container">
      <div className="self-message-box">
        <p className="self-message-p">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap
        </p>
        <p className="self-timeStamp">12:00am</p>
      </div>
    </div>
  );
}
