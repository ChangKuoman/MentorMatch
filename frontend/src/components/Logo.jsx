import React from 'react';
import LOGO from '../icons/LogoBlanco-removebg-preview2.png';
import '../css/header.css';

const Logo = () => {

    const handle = () => {
      window.location.href = "/home";
    }

    return (
      <img src={LOGO} alt="Logo Mentor Match" className='logo' onClick={handle}/>
    );
};

export default Logo;