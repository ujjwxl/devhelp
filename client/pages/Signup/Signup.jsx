import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Signup.css";
import Input from "../../components/Login/Input";
import Icon from "../../components/Login/Icon";

export default function Signup() {

  const [firstname, setFirstName] = useState('');
  const [lastname, setlastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password != confirmpassword) alert('Please enter the same password in both fields')

    if (
      !firstname || !lastname || !username || !email || !password || !confirmpassword
    ) {
      alert('Please fill in all fields');
      return;
    }
  
    if (password !== confirmpassword) {
      alert('Passwords do not match');
      return;
    }
  
    if (password.length < 8) {
      alert('Password should be at least 8 characters');
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    else {
      const capitalizedFirstName = firstname.charAt(0).toUpperCase() + firstname.slice(1);
      const capitalizedLastName = lastname.charAt(0).toUpperCase() + lastname.slice(1);
        try {
            await axios.post('http://localhost:5000/auth/register', {
              capitalizedFirstName, capitalizedLastName,username, email, password
            })
                .then(res => {
                    if (res.status == 200) {
                        console.log('Account created succesfully')
                        alert('Account created')
                    }
                })
                .catch(e => {
                    alert("Please check your signup details!")
                    console.log(e)
                })
        }
        catch (e) {
            console.log(e);
        }
    }
}

  const ButtonBackground = "linear-gradient(45deg, #0C1015, #0C1015)";

  return (
    <div className="page-with-background">

      <div className="signup-page-container">

        <h2>DevHelp</h2>
      
        <div className="signup-page-container-input">
          <Input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)}></Input>
          <Input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setlastName(e.target.value)}></Input>
          <Input type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)}></Input>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
          <Input type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}></Input>
        </div>
        

        <div className="signup-page-container-btn">
          <button onClick={handleSubmit} className="login-signup-button">SIGN UP</button>
        </div>
        
        
        <h6 className="signup-h6">Or SignUp With</h6>

        <h5 className="login-signup-links">Already have an account? {" "}
          <span className="link-for-signup-login">
            <Link to="/login">Sign In</Link>
          </span>
        </h5>

      </div>

    </div>
  );
}
