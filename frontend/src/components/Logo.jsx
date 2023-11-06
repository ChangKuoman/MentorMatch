import React from 'react';
import LOGO from '../icons/LogoBlanco-removebg-preview.png';
import '../css/header.css';

const Logo = () => {
    return (
      <img src={LOGO} alt="Logo Mentor Match" className='logo'/>
    );
};

export default Logo;