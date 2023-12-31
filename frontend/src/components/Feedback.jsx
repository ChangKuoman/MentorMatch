import React from "react";
import { useState, useEffect } from 'react';
import "../css/Feedback.css"
import Rating from '@mui/material/Rating';

import Logo from "./Logo";

import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';
import LogoLogOut from '../icons/icons8-logout-100.png';
import LogoUser from '../icons/icons8-user-64.png';

import { url, headers, getLogOutPosition } from './utils.js'


const Feedback = () => {
    const [isDisabled, setIsDisabled] = useState(false);

    const [comment, setComment] = useState("")
    const [value, setValue] = useState(0)

    const handleComment = (e) => {
        setComment(e.target.value);
    };

    function enviarForm(e) {
        e.preventDefault()
        setIsDisabled(true);

        const user = JSON.parse(localStorage.getItem('user'));
        const email = user.email;

        if (value == 0) {
            alert("Necesitas llenar la valoración para enviar el formulario.")
        }
        else {
            fetch(url + "/qualification", {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  'email': email,
                  'qualification': value,
                  'comment': comment
                }),
              }).then(response => response.json())
                .then(data=> {
                    if (data.status === 200) {
                        alert("¡Gracias por calificarnos!")
                        window.location.href = "/home"
                    }
                })
                .catch(error => {
                });
        }
        setTimeout(() => {
            setIsDisabled(false);
        }, 4000); // 4 seconds
    }

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
            <div className="contenedor-feeback">
                <div className="contenedor-feeback-chico">
                <div className="titulo-feedback">Feedback</div>
                <div>Déjanos tu opinión para seguir mejorando</div>
                <form>
                    <div className="mini-text-feeback">Comentario</div>

                    <div>
                        <textarea onChange={handleComment} className="input-texto" />
                    </div>

                    <div className="mini-text-feeback">Valoración de la página</div>
                    <Rating
                        value={value}
                        size="large"
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <button className="boton-feedback" onClick={(e) => enviarForm(e)} disabled={isDisabled}>ENVIAR</button>
                </form>
                </div>

            </div>
        </div>
    )
}

export default Feedback;