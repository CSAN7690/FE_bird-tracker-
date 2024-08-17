import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import birdLogo from '../assets/bird-logo.webp';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={birdLogo} alt="Bird Logo" className="logo-image" />
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/new-sighting">Add Sighting</Link>
            </div>
        </nav>
    );
};

export default NavBar;
