import {React, useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Notifications.css"

export default function Notifications() {
    const userId= sessionStorage.getItem('id');
    const [userNotifications, setUserNotifications]= useState([]);
    useEffect(() => {
        axios
          .get(`http://localhost:5000/auth/notifications/${userId}`) // Replace userId with the actual user ID
          .then((response) => {
            setUserNotifications(response.data);
            // console.log(userNotifications)
          })
          .catch((error) => {
            console.error("Error fetching user notifications:", error);
          });
      }, []);
      return (
        <div className='abc'>
          <div>
            {userNotifications.map((notification) => (
              <div key={notification._id}>
                <p><Link to ={`/profile/${notification.requesterId}`}>{notification.requesterUserName}</Link>{notification.message}<Link to ={`/project/${notification.projectId}`}>{notification.projectName}</Link></p>
                {/* You can display other notification fields here */}
              </div>
            ))}
          </div>
        </div>
      );
}
