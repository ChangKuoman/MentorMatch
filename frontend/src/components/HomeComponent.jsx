import React, { useState } from "react";
import Logo from "./Logo";
import "../css/HomeComponent.css"

import LogoUser from '../icons/icons8-usuario-64.png';
import LogoReservas from '../icons/icons8-calendario-64 (1).png';
import LogoCurses from '../icons/icons8-assignment-64.png';
import LogoRating from '../icons/icons8-calificación-48.png';
import LogoLogOut from '../icons/icons8-logout-100.png';

const getLogOutPosition = () => {
  const logOutElement = document.querySelector(".LogoLogOut");
  if (!logOutElement) {
    return {
      x: 0,
      y: 0,
    };
  }

  const logOutRect = logOutElement.getBoundingClientRect();
  const logOutX = logOutRect.left;
  const logOutY = logOutRect.top;
  const logOutHeight = logOutRect.height;
  const logOutWidth = logOutRect.width;
  return {
    x: logOutX - 150 + logOutWidth/2,
    y: logOutY + logOutHeight,
  };
};

const HomeComponent = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [logOutPosition, setLogOutPosition] = useState(getLogOutPosition());

  const OpenModal = () => {
    setIsOpen(!IsOpen);
    setLogOutPosition(getLogOutPosition());
  }

  const accessUser = () => {
    window.location.href = '/user/';
  }

  const accessCourses = () => {
    window.location.href = '/courses';
  }

  const handleLogout = () => {
    // Limpia los datos de la sesión del localstorage
    localStorage.removeItem('user');
    localStorage.removeItem('isLog');

    // Redirige al usuario a /login
    window.location.href = '/';
  };

  return (
    <div className="Home">
        <div className="BloqueTop">
            <div className="HeaderHome">
              <div className="space">
                <Logo />
                <h1>MentorMatch</h1>
                <img src = {LogoLogOut} 
                    alt = "logo Log Out" 
                    className="LogoLogOut" 
                    onClick={OpenModal}    
                />
                {
                  IsOpen && 
                  <div className="modal" style={{left: logOutPosition.x, top:logOutPosition.y}}>
                  <div className="overlay" onClick={OpenModal}></div>
                  <div className="modal-content">
                    <button className="close-modal" onClick={OpenModal}>Cancelar</button>
                    <button onClick={handleLogout}>Cerrar Sesion</button>
                  </div>
                </div>
                }
              </div>
            </div>
        </div>
        <div className="BloqueMid">
          <div className="BloqueMidSub1">
            <div>
              <img src = {LogoUser} alt = "Logo Usuario" className="logoHome" onClick={accessUser}/>
              <h2>USUARIO</h2>
            </div>
          </div>
          <div className="BloqueMidSub2">
            <div>
              <img src = {LogoReservas} alt = "Logo Reservas" className="logoHome" />
              <h2>RESERVAS</h2>
            </div>
          </div>
          <div className="BloqueMidSub1">
            <div>
              <img src = {LogoCurses} alt = "Logo Curso" className="logoHome" onClick={accessCourses}/>
              <h2>CURSOS<br/>DISPONIBLES</h2>
            </div>
          </div>
          <div className="BloqueMidSub2">
            <div>
              <img src = {LogoRating} alt = "Logo Rating" className="logoHome" />
              <h2>CALIFICACION</h2>
            </div>
          </div>

        </div>
        <div className="BloqueBottom">

        </div>
    </div>
  );
};

export default HomeComponent;
