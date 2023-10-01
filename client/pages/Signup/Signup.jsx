import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { FaGithub} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Signup.css";
import Input from "../../components/Login/Input";
import Icon from "../../components/Login/Icon";

export default function Signup() {
  const ButtonBackground = "linear-gradient(45deg, #0C1015, #0C1015)";
  
  return (
    <>
      <div className="container">
          <h2>DevHelp</h2>
          <div className="container-input">
            <Input type="text" placeholder="Name"></Input>
            <Input type="email" placeholder="Email"></Input>
            <Input type="password" placeholder="Password"></Input>
          </div>
          <div className="container-btn">
            <button>Sign Up</button>
          </div>
          <h6>Or SignUp With</h6>
          <hr></hr>
          <div className="container-icon">
            <Icon color={ButtonBackground}>
              <FcGoogle />
            </Icon>
            <Icon color={ButtonBackground}>
              <FaGithub />
            </Icon>
          </div>
          <h5>Already have an account? {" "} 
            <span>
              <Link to="/login">Sign In</Link>
            </span>
          </h5>
      </div>
    </>
  );
}
