// import React from 'react'
// import './Workspace.css'
// import Card from '../Card/Card'

// export default function Workspace() {
//   const name=sessionStorage.getItem('firstname');
  
//   return (
//     <div className='workspace'>
//       <h1 className='ws-h1'>Welcome back, {name}</h1>
//       <p className='ws-p'>Featured Projects</p>
//       <div className='ws-card'>
//         <Card userProfilePage={false} />
//       </div>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import './Workspace.css';
import Card from '../Card/Card';
import axios from 'axios';

export default function Workspace() {
  const [user, setUser] = useState({});
  const userId=sessionStorage.getItem('id');

  useEffect(() => {
    axios.post("http://localhost:5000/auth/find", { userId })
      .then((response) => {
        // console.log(response)
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="workspace">
      <h1 className="ws-h1">Welcome back, {user.firstname}</h1>
      <p className="ws-p">Featured Projects</p>
      <div className="ws-card">
        <Card userProfilePage={false} user={user} />
      </div>
    </div>
  );
}

