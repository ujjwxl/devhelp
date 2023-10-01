import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { FaGithub} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import Input from "../../components/Login/Input";
import Icon from "../../components/Login/Icon";

export default function Login() {
  const ButtonBackground = "linear-gradient(45deg, #0C1015, #0C1015)";
  const navigate=useNavigate();
  const handleClick = async()=>{
    navigate("/");
  }
  
  return (
    <div className="page-with-background">

      <div className="login-page-contain">
          <h2>DevHelp</h2>

          <div className="login-page-contain-input">
            <Input type="text" placeholder="Email"></Input>
            <Input type="password" placeholder="Password"></Input>
          </div>

          <div className="login-page-contain-btn">
            <button onClick={handleClick} className="login-signup-button">Sign In</button>
          </div>

          <h6 className="login-signup-h6">Or Signin With</h6>

          <hr className="login-page-hr"></hr>

          <div className="login-page-contain-icon">
            <Icon color={ButtonBackground}>
              <FcGoogle />
            </Icon>
            <Icon color={ButtonBackground}>
              <FaGithub />
            </Icon>
          </div>

          <h5 className="login-signup-links">
            <span className="link-for-signup-login">
            <Link to="/">Forgot Password?</Link>
            </span>
          </h5>

          <h5 className="login-signup-links">Don't have an account? {" "} 
            <span className="link-for-signup-login">
              <Link to="/signup">Sign Up</Link>
            </span>
          </h5>

      </div>
    </div>
  );
}
