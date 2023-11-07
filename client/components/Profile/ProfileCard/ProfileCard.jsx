import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProfileCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
export const socket = io('http://localhost:5000');

export default function ProfileCard() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState([]);

  const loginUserId = sessionStorage.getItem('id');

  // useEffect(() => {
  //   socket.emit("add_user", loginUserId)
  // },[])

  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5000/auth/find", { userId })
      .then((response) => {
        setUserDetails(response.data);
        setFollowerCount(response.data.followers.length);
        setFollowingCount(response.data.following.length);
        if (response.data.followers.includes(loggedInUserId)) {
          setIsFollowing(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId]);

  async function followUser(anotherUserId) {
    const loggedInUserId = sessionStorage.getItem("id");
    const loggedInUserName = sessionStorage.getItem("username");
    // console.log(anotherUserId)

    try {
      await axios
        .post("http://localhost:5000/auth/follow", {
          anotherUserId,
          loggedInUserId,
          loggedInUserName,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log("Followed succesfully");
            // alert('Followed')
            setIsFollowing(true);
            axios
              .post("http://localhost:5000/auth/find", { userId })
              .then((response) => {
                setUserDetails(response.data);
                setFollowerCount(response.data.followers.length);
                setFollowingCount(response.data.following.length);
              })
              .catch((error) => {
                console.error("Error fetching user details:", error);
              });
          }
        })
        .catch((e) => {
          alert("Could not follow user!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const loggedInUserId = sessionStorage.getItem("id");
  const isCurrentUser = loggedInUserId === userId;

  return (
    <div className="profile-card">
      <img
        className="profile-cover"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_DH5SrhMqR_a1X-CAeXcV0m4GINEEhEPytA&usqp=CAU"
      ></img>
      <div className="profile-card-link-btn">
        <div className="profile-card-footer">
          <div className="profile-techstack">
            <p className="profile-card-techstack">
              {userDetails.technologyOne}
            </p>
            <p className="profile-card-techstack">
              {userDetails.technologyTwo}
            </p>
            <p className="profile-card-techstack">
              {userDetails.technologyThree}
            </p>
          </div>

          <div className="profile-links">
            <span className="profile-footer-icons">
              <FontAwesomeIcon icon={faGithub} className="profile-icon" />
            </span>
            <p>/</p>
            <a href="#">{userDetails.github}</a>
            <span className="profile-footer-icons">
              <FontAwesomeIcon icon={faLink} className="profile-icon" />
            </span>
            <a href="#">{userDetails.website}</a>
            <span className="profile-footer-icons">
              {!isCurrentUser ? (
                <Link to={`/chat/${userDetails._id}`}>
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="profile-icon"
                  />
                </Link>
              ) : (
                <div></div>
              )}
            </span>
          </div>
        </div>
        {/* <div className="profile-card-btn">
        <button className="profile-btn" onClick={() => followUser(userDetails._id)}>Follow</button>
        <button className="profile-btn"><Link to={'/update'}>Update Profile</Link></button>
      </div> */}
        <div className="profile-card-btn">
          {!isCurrentUser ? (
            <button
              className="profile-btn"
              onClick={() => followUser(userDetails._id)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          ) : (
            <button className="profile-btn">
              <Link to={"/update"}>Edit Profile</Link>
            </button>
          )}
        </div>
      </div>
      {/* <img
        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
        className="profile-photo"
      ></img> */}
      <img
        src={`http://localhost:5000/assets/` + userDetails.profile_picture}
        className="profile-photo" 
      ></img>
      <div className="user-details">
        <p className="user-details-p-name">
          {userDetails.firstname + " " + userDetails.lastname}
        </p>
        <p className="user-details-p">{"@" + userDetails.username}</p>
        <p className="user-details-p">{userDetails.bio}</p>
        <div className="user-reach">
          <p className="user-details-p-reach">{followerCount} followers</p>
          <p className="user-details-p-reach">{followingCount} following</p>
        </div>
      </div>
    </div>
  );
}
