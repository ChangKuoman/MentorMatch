import React from "react";
import { useState, useEffect } from 'react';
import "../css/Subscription.css"
import "../css/Course.css"
import url from './url.js';

import Logo from "./Logo";

import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';
import LogoLogOut from '../icons/icons8-logout-100.png';
import LogoUser from '../icons/icons8-user-64.png';

import CheckLogo from '../icons/check.png'
import EquisLogo from '../icons/equis.png'

const headers = {
  'Content-Type': 'application/json',
};

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
      x: logOutX - 50 + logOutWidth/2,
      y: logOutY + logOutHeight,
    };
};

const Subscription = () => {
    const [isVisible, setIsVisible] = useState(false);
    const handleMouseEnter = () => {
        setIsVisible(true);
    };
    const handleMouseLeave = () => {
        setIsVisible(false);
    };
    const handleHomeClick = () => {
        window.location.href = '/home';
    }

    const handleBackClick  = () => {
        window.location.href = '/home';
    }

    const [IsOpen, setIsOpen] = useState(false);
    const [logOutPosition, setLogOutPosition] = useState(getLogOutPosition());
    const OpenModal = () => {
        setIsOpen(!IsOpen);
        setLogOutPosition(getLogOutPosition());
    }

    const handleLogout = () => {
        // Limpia los datos de la sesión del localstorage
        localStorage.removeItem('user');
        localStorage.removeItem('isLog');

        // Redirige al usuario a /login
        window.location.href = '/';
    };

    const accessUser = () => {
        window.location.href = '/user/';
    };

    return (
        <div onMouseLeave={handleMouseLeave}>
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
                        <div className="overlay" onClick={OpenModal}></div>
                        <div className="modal-content">
                            <button className="close-modal" onClick={OpenModal}>Cancelar</button>
                            <button onClick={handleLogout}>Cerrar Sesion</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className="frame1">
            </div>
            <div className="frame2"></div>
            <div onMouseEnter={handleMouseEnter} className="Open-nave"></div>
            <div className={`nav${isVisible ? '' : 'hidden'}`}>
                <img src = {BotonBack} alt = "Boton de regreso" className="boton-regreso" onClick={handleBackClick}/>
                <img src = {BotonHome} alt = "Boton de home" className="boton-home" onClick={handleHomeClick}/>
            </div>
            <div className="contenedor-subscription" onMouseLeave={handleMouseLeave}>
                <div className="contenedor-subscription-intermedio">
                    <div className="contenedor-subscription-titulo">
                        <div className="titulo">FREE PLAN</div>
                        <div className="precio">S/. 0</div>
                    </div>
                    <hr className="linea" />
                    <div>

                        <div className="mini-contenedor-subscription">
                            <img className="imagen" src={CheckLogo} width={50} height={50}/>
                            <div>Límite de 5 invitaciones por día</div>
                        </div>
                        <div className="mini-contenedor-subscription">
                            <img className="imagen" src={EquisLogo} width={50} height={50}/>
                            <div>Uso de herramientas IA para el apoyo de tu aprendizaje</div>
                        </div>
                        <div className="mini-contenedor-subscription">
                            <img className="imagen" src={EquisLogo} width={50} height={50}/>
                            <div>Mayor acceso a nuestros Star Mentors</div>
                        </div>
                    </div>
                </div>
                <div className="contenedor-subscription-intermedio">
                    <div className="contenedor-titulo">
                        <div className="titulo">PREMIUM PLAN</div>
                        <div className="precio">S/. 10</div>
                    </div>
                    <hr className="linea" />
                    <div>

                        <div className="mini-contenedor-subscription">
                            <img className="imagen" src={CheckLogo} width={50} height={50}/>
                            <div>Invitaciones ilimitadas por día</div>
                        </div>
                        <div className="mini-contenedor-subscription">
                            <img className="imagen" src={CheckLogo} width={50} height={50}/>
                            <div>Uso de herramientas IA para el apoyo de tu aprendizaje</div>
                        </div>
                        <div className="mini-contenedor-subscription">
                            <img className="imagen" src={CheckLogo} width={50} height={50}/>
                            <div>Mayor acceso a nuestros Star Mentors</div>
                        </div>
                        <div className="contenedor-boton-subscription">
                            <button className="boton-adquirir">¡PRONTO!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription;