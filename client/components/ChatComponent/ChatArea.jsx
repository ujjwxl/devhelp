import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './chatArea.css'
import { useParams } from 'react-router-dom'
import MessageOthers from './MessageOthers'
import MessageSelf from './MessageSelf'
import { socket } from '../Profile/ProfileCard/ProfileCard'


export default function ChatArea() {

  const chatContainerRef = useRef();

  const { chatUserId } = useParams();

  const [receiverDetails, setReceiverDetails] = useState([])

  const loggedInUserId = sessionStorage.getItem('id');

  const [messageInput, setMessageInput] = useState('');

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("add_user", loggedInUserId)
  },[])

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:5000/auth/find", { userId: chatUserId })
      .then((response) => {
        setReceiverDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [chatUserId]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/message/find", { loggedInUserId, chatUserId })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [loggedInUserId, chatUserId]);

  console.log(messages)

  const handleSendMessage = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/message/send', {
      sender: loggedInUserId,
      receiver: chatUserId,
      content: messageInput,
    })
      .then((response) => {
        setMessages([...messages, response.data]);
        setMessageInput('');
        socket.emit('send_message', {
          to: chatUserId,
          msg: messageInput
      });

      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      axios
      .post("http://localhost:5000/message/find", { loggedInUserId, chatUserId })
      .then((response) => {
        setMessages(response.data);

        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
    })
  }, [socket])

  return (
    <div className='chatArea-container'>
      <div className='chatArea-header'>
        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" alt="" className='chatArea-profile-picture' />
        <p className='chatArea-header-p'>{receiverDetails.firstname + " " + receiverDetails.lastname}</p>
      </div>
      <div className='chatArea-messages' ref={chatContainerRef}>
        {/* <MessageOthers></MessageOthers>
        <MessageSelf></MessageSelf>
        <MessageOthers></MessageOthers>
        <MessageSelf></MessageSelf>
        <MessageOthers></MessageOthers>
        <MessageSelf></MessageSelf> */}
        {messages.map((message) =>
          message.sender === chatUserId ? (
            <MessageOthers key={message._id} content={message.content} firstname={receiverDetails.firstname} lastname={receiverDetails.lastname} time={message.createdAt}></MessageOthers>
          ) : (
            <MessageSelf key={message._id} content={message.content} time={message.createdAt}></MessageSelf>
          )
        )}
      </div>
      <form action="" onSubmit={handleSendMessage}>
        <div className='chatArea-footer'>
          <input className='chatArea-footer-input' placeholder='Type a message' value={messageInput} onChange={(e) => setMessageInput(e.target.value)}></input>
          <button type='submit' onClick={handleSendMessage}>Send</button>
        </div>
      </form>
    </div>
  )
}

