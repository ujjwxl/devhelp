import React from "react";
import Navbar from "../../components/MainHome/Navbar/Navbar";
import SideBar from "../../components/MainHome/SideBar/SideBar";
import "./About.css";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="main-home">
        <div className="home-side-bar">
          <SideBar />
        </div>
        <div className="home-work-space workspce">
          <h1 className="project-yellow-heading">Welcome to DevHelp!</h1>
          <h2 className="ws-h2 project-yellow-heading">Who We Are</h2>
          {/* <p>
            DevHelp is a collaborative platform founded by Aman Agarwal and
            Ujjwal Kumar, dedicated to bringing developers together to share,
            discover, and continue each other's projects.
          </p> */}
          <p>
            DevHelp is a collaborative platform founded by&nbsp;
            <a href="https://github.com/agrawalaman775" target="_blank" className="developer-profile-link">Aman Agarwal</a>&nbsp;and&nbsp;
            <a href="https://github.com/ujjwxl" target="_blank" className="developer-profile-link">Ujjwal Kumar</a>,
            dedicated to bringing developers together to share, discover, and continue each other's projects.
          </p>
          <h2 className="ws-h2">Our Mission</h2>
          <p>
            At DevHelp, we're on a mission to empower the developer community by
            providing a space where projects, big or small, get the attention
            they deserve. Whether you're looking to revive an abandoned project
            or seeking collaboration on your latest idea, DevHelp is your go-to
            destination.
          </p>
          <h2 className="ws-h2">What We Offer</h2>
          <ul>
            <li>
              <h3>Project Repository:</h3>
              <p>
                Explore a curated collection of abandoned projects waiting for
                passionate developers like you to pick up the mantle.
              </p>
            </li>
            <li>
              <h3>Collaboration Hub:</h3>
              <p>
                Connect with like-minded developers, exchange ideas, and work
                together to turn visions into reality.
              </p>
            </li>
            <li>
              <h3>Real-Time Chat:</h3>
              <p>
                {" "}
                Engage in meaningful conversations with fellow developers using
                our integrated real-time chat feature. Foster connections, share
                insights, and build something great together.
              </p>
            </li>
          </ul>
          <h2 className="ws-h2">How It Works</h2>
          <ol>
            <li>
              <h3>Post a Project:</h3>
              <p>
                Share your abandoned projects or kickstart collaborations by
                posting your ideas on DevHelp.
              </p>
            </li>
            <li>
              <h3>Discover Projects:</h3>
              <p>
                Explore a diverse range of projects contributed by developers
                worldwide. Find projects that resonate with you and get
                involved.
              </p>
            </li>
            <li>
              <h3>Collaborate:</h3>
              <p>
                Utilize our real-time chat feature to communicate effortlessly
                with other developers. Discuss project details, share your
                expertise, and create something remarkable together.
              </p>
            </li>
          </ol>
          <h2 className="ws-h2">Contact Us</h2>
          <p>Have questions or suggestions? Feel free to reach out to us at [contact@devhelp.com].</p>
          <p>Thank you for being a part of DevHelp – where collaboration breathes new life into projects!</p>
        </div>
      </div>
    </>
  );
}
