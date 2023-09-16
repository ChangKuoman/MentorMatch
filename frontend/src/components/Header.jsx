import React from 'react';
import Title from './Title';
import logo from '../css/LogoBlanco-removebg-preview.png';
import '../css/header.css';

const Logo = () => {
  return (
    <img src={logo} alt="Logo MentorMatch" className='logo'/>
  );
};

const Header = () => {
  return (
    <header className='header'>
      <div class="header-container">
        <div className='title'>
          <Title />
        </div>
        <div className='logo'>
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
