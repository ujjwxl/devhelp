import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./Home.css";
import Spline from '@splinetool/react-spline';
import Loading from "../../components/Login/Loading";

export default function Home() {
    const navigate=useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        navigate('/signup');
    }

    return (
        <div className="App">
            {loading ? (
                <Loading />
            ) : (
                <div className="home-page page-with-background">
                    <div className="home-page-overlay">

                        <div className='navbar-component'>
                            <div className="brand-logo">
                                <h1 className='Navbar'>DevHelp</h1>
                            </div>

                            <div className="navbar-links">
                                <Link className='navbar-link' to='/signup'>Register</Link>
                                <Link className='navbar-link' to='/login'>Sign In</Link>
                            </div>
                        </div>


                        <div className="home-about-section">
                            <p>
                                The perfect place for developers find collaborators for their projects. <br></br>
                                Join the largest community of developers and see your ideas come to life.
                            </p>
                            <button className="home-about-section-button" onClick={handleClick}>GET STARTED</button>
                        </div>

                    </div>

                    <Spline scene="https://prod.spline.design/YQmdLbRmbZk5NM6Q/scene.splinecode" className="spline-video" />

                </div>
            )}
        </div>
    )
}

