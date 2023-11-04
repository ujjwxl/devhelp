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
      // const handleClick = async()=>{
      //   navigate("/");
      // }

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

    // const handleGoogleLogin =  ()=>{
    //   window.open("http://localhost:5000/auth/google", "_self");
    // }

    // const storeGoogleUserDataInSessionStorage = async () => {
    //   // Get the user's name and email from the backend API.
    //   // const response = await axios.get("http://localhost:5000/auth/google/callback");
    //   // const user = response.data;
    
    //   // Store the user's name and email in session storage.
    //   sessionStorage.setItem("id", user._id);
    //   sessionStorage.setItem("username", user.username);
    //   sessionStorage.setItem("firstname", user.firstname);
    //   sessionStorage.setItem("lastname", user.lastname);
    //   sessionStorage.setItem("profile_picture", user.profile_picture);

    //   navigate('/home');
    //   console.log("hello");
    // };

    // const storeGoogleUserDataInSessionStorage = (user) => {
    //   // Store the user's data in session storage.
    //   sessionStorage.setItem("id", user._id);
    //   sessionStorage.setItem("username", user.username);
    //   sessionStorage.setItem("firstname", user.firstname);
    //   sessionStorage.setItem("lastname", user.lastname);
    //   sessionStorage.setItem("profile_picture", user.profile_picture);
    
    //   // Navigate to the desired page.
    //   navigate('/home');
    //   console.log("hello");
    // };

    const handleGoogleLogin = async () => {
      // Open a new window and redirect the user to your backend API to log in with Google.
      window.location.href = "http://localhost:5000/auth/google";
      axios.get("http://localhost:5000/auth/login/success", {
          withCredentials: true,
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
      })
      .then((response) => {
          if (response.status === 200) {
              return response.data;
          } else {
              throw new Error("Authentication has failed!");
          }
      })
      .then((resObject) => {
          setUser(resObject.user);
          const user = resObject.user
          sessionStorage.setItem("id", user._id);
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("firstname", user.firstname);
          sessionStorage.setItem("lastname", user.lastname);
          sessionStorage.setItem("profile_picture", user.profile_picture);
      })
      .catch((error) => {
          console.error("Error fetching user details:", error);
      });
    };

  //   useEffect(() => {
  //     axios.get("http://localhost:5000/auth/login/success", {
  //         withCredentials: true,
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //         },
  //     })
  //     .then((response) => {
  //         if (response.status === 200) {
  //             return response.data;
  //         } else {
  //             throw new Error("Authentication has failed!");
  //         }
  //     })
  //     .then((resObject) => {
  //         setUser(resObject.user);
  //         const user = resObject.user
  //         sessionStorage.setItem("id", user._id);
  //         sessionStorage.setItem("username", user.username);
  //         sessionStorage.setItem("firstname", user.firstname);
  //         sessionStorage.setItem("lastname", user.lastname);
  //         sessionStorage.setItem("profile_picture", user.profile_picture);
  //     })
  //     .catch((error) => {
  //         console.error("Error fetching user details:", error);
  //     });
  // }, []);

    
    // window.addEventListener("message", async (event) => {
    //   console.log("Hello");
    //   if (event.origin === "http://localhost:5000" && event.data.type === "googleLoginSuccess") {
    //     const user = event.data.user;
    //     storeGoogleUserDataInSessionStorage(user);
    //   }
    // });


      return (
        <div className="page-with-background">

          <div className="login-page-contain">
              <h2>DevHelp</h2>

              
              <form onSubmit={handleSubmit}>    
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} ></Input>
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
              
                <div className="login-page-contain-btn">
                  <button onClick={handleSubmit} className="login-signup-button">Sign In</button>
                </div>
              </form>
              
              <h6 className="login-h6">Or Signin With</h6>

              <hr className="login-page-hr"></hr>

              <div className="login-page-contain-icon">
                <Icon color={ButtonBackground}>
                  <FcGoogle onClick={handleGoogleLogin}/>
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
