  import React, { useState } from "react";
  import { Link, useNavigate} from "react-router-dom";
  import axios from "axios";
  import { FaGithub} from "react-icons/fa";
  import { FcGoogle } from "react-icons/fc";
  import "./Login.css";
  import Input from "../../components/Login/Input";
  import Icon from "../../components/Login/Icon";

  export default function Login() {
    const ButtonBackground = "linear-gradient(45deg, #0C1015, #0C1015)";
    const navigate=useNavigate();
    // const handleClick = async()=>{
    //   navigate("/");
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          await axios.post('http://localhost:5000/auth/login', {
              email, password
          })
              .then(res => {
                  if (res.status == 200) {
                      console.log('Login succesful')
                      const token = res.data.token;
                      const userName = res.data.name;
                      const lastName = res.data.lastname;
                      const userId = res.data.userId;
                      sessionStorage.setItem('token', token);
                      sessionStorage.setItem('id', userId);
                      sessionStorage.setItem('name', userName);
                      sessionStorage.setItem('lastname', lastName);
                      navigate('/');
                  }
              })
              .catch(e => {
                  alert("Invalid login details! Please try again")
                  //   console.log(e);
              })
      }
      catch (e) {
          console.log(e);
      }
  }
    
    return (
      <div className="page-with-background">

        <div className="login-page-contain">
            <h2>DevHelp</h2>

            
            <form onSubmit={handleSubmit}>    
            {/* <div className="login-page-contain-input"> */}
              <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ></Input>
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
              {/* </div> */}
            
              
            

            <div className="login-page-contain-btn">
              <button onClick={handleSubmit} className="login-signup-button">Sign In</button>
            </div>
            </form>
            
            <h6 className="login-h6">Or Signin With</h6>

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
