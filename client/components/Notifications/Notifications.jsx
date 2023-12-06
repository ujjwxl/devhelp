import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Notifications.css";

export default function Notifications() {
  const userId = sessionStorage.getItem("id");
  const [userNotifications, setUserNotifications] = useState([]);

  // async function acceptRequest(notificationId, senderId, projectName, projectId) {
  //   const loggedInUserId = sessionStorage.getItem("id");
  //   const loggedInUserName = sessionStorage.getItem("username");

  //   try {
  //     await axios
  //       .post("http://localhost:5000/project/accept", {
  //         senderId,
  //         projectName,
  //         loggedInUserName,
  //         loggedInUserId,
  //         projectId,
  //       })
  //       .then((res) => {
  //         if (res.status == 200) {
  //           console.log("Accepted succesfully");
  //           axios.delete(`http://localhost:5000/project/remove/${notificationId}`);
  //         }
  //       })
  //       .catch((e) => {
  //         alert("Accept request could not be processed!");
  //         console.log(e);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function acceptRequest(notificationId, senderId, projectName, projectId) {
    const loggedInUserId = sessionStorage.getItem("id");
    const loggedInUserName = sessionStorage.getItem("username");
  
    try {
      const response = await axios.post("http://localhost:5000/project/accept", {
        senderId,
        projectName,
        loggedInUserName,
        loggedInUserId,
        projectId,
      });
  
      if (response.status === 200) {
        console.log("Accepted successfully");

        // Update state to remove the accepted notification
        setUserNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification._id !== notificationId)
        );

        // If the accept request was successful, make a separate call to delete the notification
        await axios.delete(`http://localhost:5000/project/remove/${notificationId}`);
      }
    } catch (error) {
      alert("Accept request could not be processed!");
      console.log(error);
    }
  }

  async function declineRequest(notificationId, senderId, projectName, projectId) {
    const loggedInUserId = sessionStorage.getItem("id");
    const loggedInUserName = sessionStorage.getItem("username");
  
    try {
      const response = await axios.post("http://localhost:5000/project/decline", {
        senderId,
        projectName,
        loggedInUserName,
        loggedInUserId,
        projectId,
      });
  
      if (response.status === 200) {
        console.log("Declined successfully");

        // Update state to remove the declined notification
        setUserNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification._id !== notificationId)
        );
  
        // If the accept request was successful, make a separate call to delete the notification
        await axios.delete(`http://localhost:5000/project/remove/${notificationId}`);
      }
    } catch (error) {
      alert("Decline request could not be processed!");
      console.log(error);
    }
  }

  // async function declineRequest(notificationId, senderId, projectName, projectId) {
  //   const loggedInUserId = sessionStorage.getItem("id");
  //   const loggedInUserName = sessionStorage.getItem("username");

  //   try {
  //     await axios
  //       .post("http://localhost:5000/project/decline", {
  //         senderId,
  //         projectName,
  //         loggedInUserName,
  //         loggedInUserId,
  //         projectId,
  //       })
  //       .then((res) => {
  //         if (res.status == 200) {
  //           console.log("Declined succesfully");
  //         }
  //       })
  //       .catch((e) => {
  //         alert("Decline request could not be processed!");
  //         console.log(e);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/notifications/${userId}`) // Replace userId with the actual user ID
      .then((response) => {
        setUserNotifications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user notifications:", error);
      });
  }, []);
  return (
    <div className="notify">
      <div>
        {userNotifications.map((notification) => (
          <div key={notification._id}>
            <p className="notification-message">
              <Link to={`/profile/${notification.requesterId}`}>
                {notification.requesterUserName}
              </Link>{" "}
              {notification.message}{" "}
              <Link to={`/project/${notification.projectId}`}>
                {notification.projectName}
              </Link>
              <br/>
              <span className="createdAt">
                at {new Date(notification.createdAt).toLocaleString('en-GB')}
              </span>
              
            </p>
            {/* You can display other notification fields here */}
            {notification.isRequest && (
              <div>
                <button
                className="respond-btn"
                  onClick={() =>
                    acceptRequest(
                      notification._id,
                      notification.requesterId,
                      notification.projectName,
                      notification.projectId
                    )
                  }
                >
                  Accept
                </button>
                <button
                className="respond-btn respond-btn-2"
                  onClick={() =>
                    declineRequest(
                      notification._id,
                      notification.requesterId,
                      notification.projectName,
                      notification.projectId
                    )
                  }
                >
                  Decline
                </button>
              </div>
            )}
            <hr/>
          </div>
        ))}
        
      </div>
    </div>
  );
}
