// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// // const socket = io('http://localhost:5000'); 
// const socket = io('http://localhost:5000', {
//   withCredentials: true,
//   transports: ['websocket'], // Use WebSocket transport if available
//   extraHeaders: {
//     'Access-Control-Allow-Origin': 'http://localhost:5173', // Specify the origin
//     'Access-Control-Allow-Methods': 'GET, POST', // Specify allowed methods
//   },
// });

// export default function ChatComponent() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Listen for incoming chat messages
//     socket.on('chatMessage', (message) => {
//       setMessages([...messages, message]);
//     });
//   }, [messages]);

//   const sendMessage = () => {
//     // Send a chat message to the server
//     socket.emit('chatMessage', message);
//     setMessage('');
//   };

//   return (
//     <div className="workspace">
//       <div className="chat-box">
//         <div className="messages">
//           {messages.map((msg, index) => (
//             <div key={index} className="message">
//               {msg}
//             </div>
//           ))}
//         </div>
//         <div className="input-box">
//           <input
//             type="text"
//             placeholder="Type your message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react'
import './chatArea.css'
import MessageOthers from './MessageOthers'
import MessageSelf from './MessageSelf'


export default function ChatArea() {
  return (
    <div className='chatArea-container'>
      <div className='chatArea-header'>
        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" alt="" className='chatArea-profile-picture' />
        <p className='chatArea-header-p'>Rohit Sharma</p>
      </div>
      <div className='chatArea-messages'>
        <MessageOthers></MessageOthers>
        <MessageSelf></MessageSelf>
        <MessageOthers></MessageOthers>
        <MessageSelf></MessageSelf>
        <MessageOthers></MessageOthers>
        <MessageSelf></MessageSelf>
      </div>
      <div className='chatArea-footer'>
        <input className='chatArea-footer-input' placeholder='Type a message'></input>
        <button>Send</button>
      </div>
    </div>
  )
}

