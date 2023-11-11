import React, { useState } from "react";
import Logo from "./Logo";
import "../css/HomeComponent.css"

import LogoUser from '../icons/icons8-user-64.png';
import LogoMessage from '../icons/icon-messages.png'
import LogoReservas from '../icons/icons8-calendario-64 (1).png';
import LogoCurses from '../icons/icons8-assignment-64.png';
import LogoRating from '../icons/icons8-calificación-48.png';
import LogoLogOut from '../icons/icons8-logout-100.png';
import { getLogOutPosition } from "./utils.js";


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

  const accessMessages = () => {
    window.location.href = '/chats'
  }

  const accessEvents = () => {
    window.location.href = '/reservas';
  }

  const accessFeedback = () => {
    window.location.href = '/feedback';
  }

  const handleLogout = () => {
    // Limpia los datos de la sesión del localstorage
    localStorage.removeItem('user');
    localStorage.removeItem('isLog');

    // Redirige al usuario a /login
    window.location.href = '/';
  };

  const accessSubs = () => {
    window.location.href = '/subscripciones';
  }

  return (
    <div className="Home">
      <div className="Frame1-Home"></div>
      <div className="Frame2-Home"></div>
      <div className="HeaderHome">
        <Logo className = 'Logo'/>
        <h1>MentorMatch</h1>
        <div className="botones-nav">
          <img src = {LogoUser}
            alt="logo user"
            className="LogoLogOut"
            onClick={accessUser}
          />
          <img src = {LogoLogOut}
              alt = "logo Log Out"
              className="LogoLogOut"
              onClick={OpenModal}
          />
          {
            IsOpen &&
            <div className="modal" style={{left: logOutPosition.x, top:logOutPosition.y}}>

            <div className="modal-content">
              <button className="close-modal" onClick={OpenModal}>Cancelar</button>
              <button onClick={handleLogout}>Cerrar Sesion</button>
            </div>
          </div>
          }
        </div>
      </div>
      <div className="BloqueMid">
        <div className="BloqueMidSub1">
          <div>
            <img src = {LogoMessage} alt = "Logo Message" className="logoHome" onClick={accessMessages}/>
            <h2>Mis Mensajes</h2>
          </div>
        </div>
        <div className="BloqueMidSub2">
          <div>
            <img src = {LogoReservas} alt = "Logo Reservas" className="logoHome" onClick={accessEvents}/>
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
            <img src = {LogoRating} alt = "Logo Rating" className="logoHome" onClick={accessFeedback}/>
            <h2>FEEDBACK</h2>
          </div>
        </div>
      </div>
      <div className="Frame3-Home"></div>
      <div className="Frame4-Home"></div>
      <div className="premiun-bar" onClick={accessSubs}>
        <p>Pásate a Premium</p>
      </div>
    </div>
  );
};

export default HomeComponent;

