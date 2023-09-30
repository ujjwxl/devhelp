import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { FaGithub} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import Input from "../../components/Login/Input";
import Button from "../../components/Login/Button";
import Icon from "../../components/Login/Icon";

export default function Login() {
  const ButtonBackground = "linear-gradient(45deg, #0C1015, #0C1015)";
  
  return (
    <>
      <div className="contain">
          <h2>DevHelp</h2>
          <div className="contain-input">
            <Input type="text" placeholder="Email"></Input>
            <Input type="password" placeholder="Password"></Input>
          </div>
          <div className="contain-btn">
            <button>Sign In</button>
          </div>
          <h6>Or Signin With</h6>
          <hr></hr>
          <div className="contain-icon">
            <Icon color={ButtonBackground}>
              <FcGoogle />
            </Icon>
            <Icon color={ButtonBackground}>
              <FaGithub />
            </Icon>
          </div>
          <h5>
            <span>
            <Link to="/">Forgot Password?</Link>
            </span>
          </h5>
          <h5>Don't have an account? {" "} 
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </h5>
      </div>
    </>
  );
}
