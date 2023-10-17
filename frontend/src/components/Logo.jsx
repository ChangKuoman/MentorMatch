import React from 'react';
import logo from '../css/LogoBlanco-removebg-preview.png';
import '../css/header.css';

const Logo = () => {
    return (
      <img src={logo} alt="Logo MentorMatch" className='logo'/>
    );
};

export default Logo;