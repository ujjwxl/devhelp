  import React, { useState, useEffect } from "react";
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

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const [user, setUser] = useState(null);

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
                        const firstname = res.data.name;
                        const lastName = res.data.lastname;
                        const userName = res.data.username;
                        const userId = res.data.userId;
                        const profilePicture = res.data.profile_picture;
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('id', userId);
                        sessionStorage.setItem('username', userName);
                        sessionStorage.setItem('firstname', firstname);
                        sessionStorage.setItem('lastname', lastName);
                        sessionStorage.setItem('profile_picture', profilePicture);
                        navigate('/home');
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
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ></Input>
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
              
                <div className="login-page-contain-btn">
                  <button onClick={handleSubmit} className="login-signup-button">SIGN IN</button>
                </div>
              </form>
              
              <h6 className="login-h6">Or Signin With</h6>

              <hr className="login-page-hr"></hr>

              {/* <div className="login-page-contain-icon">
                <Icon color={ButtonBackground}>
                  <FcGoogle onClick={handleGoogleLogin}/>
                </Icon>
                <Icon color={ButtonBackground}>
                  <FaGithub />
                </Icon>
              </div> */}

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
