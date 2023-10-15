import React from 'react';
import Title from './Title';
import Logo from './Logo';

const Header = () => {
  return (
    <header className='header'>
      <div className="header-container">
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
