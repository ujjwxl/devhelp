import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup"
import MainHome from "../pages/MainHome/MainHome";
import AddProject from "../pages/AddProject/AddProject";
import Profile from "../pages/profile/profile"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<MainHome />}></Route>
          <Route path="/add" element={<AddProject />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
