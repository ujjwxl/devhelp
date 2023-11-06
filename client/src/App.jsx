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
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails";
import SavedProjects from "../pages/SavedProjects/SavedProjects";
import Chat from "../pages/Chat/Chat";

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
          <Route path="/update" element={<EditProfile />}></Route>
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/saved" element={<SavedProjects />}></Route>
          <Route path="/chat/:chatUserId" element={<Chat />}></Route>
          <Route path="/abandon" element={<MainHome />}></Route>
          <Route path="/collaborate" element={<MainHome />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
