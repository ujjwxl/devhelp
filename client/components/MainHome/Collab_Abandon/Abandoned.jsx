import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import axios from 'axios';

export default function AbandonedComponent() {
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
      <p className="ws-p">Abandoned Projects</p>
      <div className="ws-card">
        <Card userProfilePage={false} user={user} isAbandoned={true} />
      </div>
    </div>
  );
}

