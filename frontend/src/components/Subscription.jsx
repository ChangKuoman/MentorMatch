import React from "react";
import { useState } from 'react';
import "../css/Subscription.css"
import "../css/Course.css"

import Logo from "./Logo";

import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';
import LogoLogOut from '../icons/icons8-logout-100.png';
import LogoUser from '../icons/icons8-user-64.png';

import CheckLogo from '../icons/check.png'
import EquisLogo from '../icons/equis.png'
import { getLogOutPosition } from "./utils.js";

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

    // logica para el switch mensual-anual

    const [switchAnual, setSwitchAnual] = useState(true);

    const handleSwitch = () =>{
        setSwitchAnual(!switchAnual);
    }

    const SwitchMensualAnual = ({ switchAnual, precioMensual }) => {
        const precioAnual = precioMensual * 12;
        const descuentoAnual = precioAnual * 0.1;

        if (switchAnual) {
          return (
            <>
                <p className="descuento-text-ac"> 10% Descuento </p>
                <p className="precio">S/. {precioAnual - descuentoAnual}</p>
            </>
          );
        } else {
          return <p className="precio">S/. {precioMensual}</p>;
        }
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
                <div className="switch-mensual-anual-ac">
                    <p className="text-switch-ac">mensual</p>
                    <input
                        className="input-switch-ac"
                        type = "range"
                        id="switch"
                        min={0}
                        max={1}
                        onChange={handleSwitch}
                    />
                    <p className="text-switch-ac">anual</p>
                </div>
                <div className="planes-ac">
                    <div className="contenedor-subscription-intermedio">
                        <div className="contenedor-subscription-titulo">
                            <div className="titulo">FREE PLAN</div>
                            <SwitchMensualAnual switchAnual={false} precioMensual={0}/>
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
                        <div className="contenedor-subscription-titulo">
                            <div className="titulo">PREMIUM PLAN</div>
                            <SwitchMensualAnual switchAnual={switchAnual} precioMensual={5}/>
                        </div>
                        <hr className="linea" />
                        <div>

                            <div className="mini-contenedor-subscription">
                                <img className="imagen" src={CheckLogo} width={50} height={50}/>
                                <div>Invitaciones ilimitadas por día</div>
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
                        <div className="contenedor-subscription-titulo">
                            <div className="titulo">VIP PLAN</div>
                            <SwitchMensualAnual switchAnual={switchAnual} precioMensual={10}/>
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
        </div>
    )
}

export default Subscription;