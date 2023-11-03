import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Notifications.css";

export default function Notifications() {
  const userId = sessionStorage.getItem("id");
  const [userNotifications, setUserNotifications] = useState([]);

  async function acceptRequest(senderId, projectName, projectId) {
    const loggedInUserId = sessionStorage.getItem("id");
    const loggedInUserName = sessionStorage.getItem("username");

    try {
      await axios
        .post("http://localhost:5000/project/accept", {
          senderId,
          projectName,
          loggedInUserName,
          loggedInUserId,
          projectId,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Accepted succesfully");
          }
        })
        .catch((e) => {
          alert("Accept request could not be processed!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function declineRequest(senderId, projectName, projectId) {
    const loggedInUserId = sessionStorage.getItem("id");
    const loggedInUserName = sessionStorage.getItem("username");

    try {
      await axios
        .post("http://localhost:5000/project/decline", {
          senderId,
          projectName,
          loggedInUserName,
          loggedInUserId,
          projectId,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Declined succesfully");
          }
        })
        .catch((e) => {
          alert("Decline request could not be processed!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

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
            <p>
              <Link to={`/profile/${notification.requesterId}`}>
                {notification.requesterUserName}
              </Link>{" "}
              {notification.message}
              <Link to={`/project/${notification.projectId}`}>
                {notification.projectName}
              </Link>
            </p>
            {/* You can display other notification fields here */}
            {notification.isRequest && (
              <div>
                <button
                  onClick={() =>
                    acceptRequest(
                      notification.requesterId,
                      notification.projectName,
                      notification.projectId
                    )
                  }
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    declineRequest(
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
          </div>
        ))}
      </div>
    </div>
  );
}
