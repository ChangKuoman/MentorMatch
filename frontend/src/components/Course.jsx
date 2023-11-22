import React from "react";
import { useState, useEffect, useRef } from 'react';
import Rating from '@mui/material/Rating';
import "../css/Course.css"

import Logo from "./Logo";

import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';
import LogoLogOut from '../icons/icons8-logout-100.png';
import LogoUser from '../icons/icons8-user-64.png';
import ReportFlag from '../icons/report-flag.png';

import { url, headers, listaCursos, setQualification, calcularEdad, hallarImagen, getLogOutPosition } from './utils.js';


const Course = () => {
    const [executed, setExecuted] = useState(false);
    const [deactivateButtons, setDeactivateButtons] = useState(false);

    const lastItemRef = useRef(null);
    const [users, setUsers] = useState([])
    const [validUsers, setValidUsers] = useState([])
    const [tag, setTag] = useState('none')

    const manejarTag = (e) => {
      setTag(e.target.value);
      setValidUsers([]);
      if (e.target.value === "none") {
          setValidUsers(users);
      } else {
          users.map((user) => {
              if (user.tags.includes(e.target.value)) {
                  setValidUsers(validUsers => [...validUsers, user])
              }
          })
      }
    }

    useEffect(() => {
        async function fetchData() {
            const user = JSON.parse(localStorage.getItem('user'));
            const email = user.email;

            fetch(url + "/get-matching-users", {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  'email': email
                }),
              }).then(response => response.json())
                .then(data=> {
                  if (data.status === 200){
                    setUsers(data.users)
                    setValidUsers(data.users)
                } else {
                  }
                })
                .catch(error => {
                });
        }

        fetchData();
        }, []);

      const soundLike = new Audio('like.mp3');
      const soundHate = new Audio('hate.mp3');

    const Like = () => {
        setExecuted(true);
        soundLike.play();
        const user = JSON.parse(localStorage.getItem('user'));
        const my_email = user.email;
        const other_user = validUsers[validUsers.length - 1];
        const email = other_user.email;

       setUsers(users.filter(user => user !== validUsers[validUsers.length - 1]))
       setValidUsers(validUsers.slice(0, validUsers.length - 1));

       //console.log(lastItemRef.current);

       fetch(url + "/new-event", {
        method: 'POST',
        headers,
        body: JSON.stringify({
            'email_receiver': my_email,
            'email_giver': email,
            'tag': tag
        }),
        }).then(response => response.json())
        .then(data=> {
            if (data.status === 200){
                console.log(data);
            } else {
            }
        })
        .catch(error => {
        });

    };

    const Hate = () => {
        setExecuted(true);
        soundHate.play();

        setUsers(users.filter(user => user !== validUsers[validUsers.length - 1]))
        setValidUsers(validUsers.slice(0, validUsers.length - 1));

        //console.log(lastItemRef.current);
    };

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
    }

    useEffect(() => {
        if (executed) {
            if (validUsers.length === 0) {
                setDeactivateButtons(true)
            }
        }
        setExecuted(false);
    }, [executed]);

    useEffect(() => {
        if (validUsers.length !== 0) {
            setDeactivateButtons(false)
        }
    }, [validUsers]);

    function llamada(email) {
        setExecuted(true);

        setUsers(users.filter(user => user !== validUsers[validUsers.length - 1]))
        setValidUsers(validUsers.slice(0, validUsers.length - 1));

        const user = JSON.parse(localStorage.getItem('user'));
        const my_email = user.email;

        fetch(url + "/report", {
            method: 'POST',
            headers,
            body: JSON.stringify({
                'email': my_email,
                'email_report': email
            }),
            }).then(response => response.json())
            .then(data=> {
                if (data.status === 200){
                    console.log(data);
                    alert("Usuario reportado con éxito")
                } else {
                }
            })
            .catch(error => {
            });

        console.log(email);
    }

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
            <div className="carrusel-perfiles">
                <div className="contenedor-filtro">
                    <div className="texto-filtro">Filtro de cursos</div>
                    <select className="classic" onChange={manejarTag}>
                        <option value="none">Todos</option>
                        {
                            listaCursos.map((curso) => (
                                <option key={curso} value={curso}>{curso}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="container">
                    {validUsers.map((user) => (
                        <div key={user.email} className="swipe" ref={user.email === users[users.length - 1].email ? lastItemRef : null}>
                            <div className="card">
                            <div className="report-flag" onClick={() => llamada(user.email)}><img className="image-report-flag" src={ReportFlag} width={20} height={20}/></div>
                            <div className="contenedor-grande">
                                <div className="div-izquierda">

                                    {/*<img className={user.verified ? "imagen-pfp dorado" : "imagen-pfp"} src={DefaultPFP} />*/}

                                    <img className={user.verified ? "imagen-pfp dorado" : "imagen-pfp"} src={hallarImagen(user)} />
                                    <div className="contenedor-titulo">
                                        <h3>{user.name} {user.surname} - {calcularEdad(user.birthDate)}</h3>
                                    </div>
                                    <Rating defaultValue={setQualification(user.qualification)} precision={0.5} readOnly />
                                </div>
                                <div className="div-derecha">
                                    <div className="tag-title">Acerca de mí</div>
                                    <div className="contenedor-descripcion">{user.description}</div>

                                    <div className="tag-title">Cursos que domino</div>
                                    <div className="contenedor-tags control-overflow">
                                        {user.tags.map((tag) => (
                                            <div key= {tag} className="tag">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="contenedor-iconos-l-h">
                    <div className="icons">
                        <svg onClick={Hate} className={`hate-buton ${deactivateButtons ? 'no-click' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.07 127.89">
                            <path className="a" d="M128.07,64.07c-.5,36.31-28,63.57-64,63.82S-.17,99.33,0,63.29C.17,28.25,29.23-.3,64.43,0A63.88,63.88,0,0,1,128.07,64.07ZM45.32,38.54c-2.44.36-4.63,1.12-6,3.68a6.39,6.39,0,0,0,.94,7.83A143,143,0,0,0,50.42,60.36c2.73,2.48,3.44,4.31.2,7a98.44,98.44,0,0,0-9.52,9.53c-3.62,4-3.66,7.48-.47,10.59,2.82,2.76,7.12,2.54,10.7-.79,3.05-2.83,5.91-5.86,8.85-8.8,2.58-2.57,5.16-2.53,7.73,0,2.83,2.81,5.62,5.67,8.52,8.42,3.87,3.68,8.08,4.08,11,1.15,3.23-3.21,3-6.85-.83-11C83.57,73.21,80.44,70,77.1,67c-2.37-2.13-2.71-3.65-.13-5.91,3.24-2.85,6.15-6.08,9.2-9.15,4.17-4.2,4.66-8,1.45-11.34-2.93-3-7.58-2.61-11.49,1.19-3.34,3.25-6.66,6.52-9.85,9.91-1.64,1.74-2.85,1.73-4.49,0-3.32-3.5-6.84-6.81-10.21-10.26A9,9,0,0,0,45.32,38.54Z"/>
                            <path d="M45.32,38.54a9,9,0,0,1,6.26,2.87c3.37,3.45,6.89,6.76,10.21,10.26,1.64,1.73,2.85,1.74,4.49,0,3.19-3.39,6.51-6.66,9.85-9.91C80,38,84.69,37.52,87.62,40.57c3.21,3.34,2.72,7.14-1.45,11.34-3,3.07-6,6.3-9.2,9.15-2.58,2.26-2.24,3.78.13,5.91,3.34,3,6.47,6.24,9.53,9.52,3.87,4.16,4.06,7.8.83,11-2.95,2.93-7.16,2.53-11-1.15-2.9-2.75-5.69-5.61-8.52-8.42-2.57-2.54-5.15-2.58-7.73,0-2.94,2.94-5.8,6-8.85,8.8-3.58,3.33-7.88,3.55-10.7.79-3.19-3.11-3.15-6.6.47-10.59a98.44,98.44,0,0,1,9.52-9.53c3.24-2.72,2.53-4.55-.2-7A143,143,0,0,1,40.28,50.05a6.39,6.39,0,0,1-.94-7.83C40.69,39.66,42.88,38.9,45.32,38.54Z"/>
                        </svg>
                        <svg onClick={Like} className={`like-buton ${deactivateButtons ? 'no-click' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.06 127.99">
                            <path className="a" d="M128.06,63.83a63.65,63.65,0,0,1-64,64.16A63.57,63.57,0,0,1,0,64a64,64,0,0,1,128.06-.13ZM96,56.53c0-5.82-3.9-13.3-10.19-16.05-6.9-3-13.67-2.67-19.37,2.82-2,1.9-3.16,1.41-4.93-.17-2.34-2.08-4.86-3.89-8.25-4.24-9.13-.92-15.31,2.3-19.11,10.25-3.89,8.11-2.42,17.27,4,23.34,7.5,7,15.22,13.88,22.77,20.89,2.06,1.92,3.76,2.27,6,.21C74.36,86.7,82,80,89.39,73.09,93.57,69.21,96.06,64.45,96,56.53Z"/>
                            <path d="M96,56.53c.08,7.92-2.41,12.68-6.59,16.56C82,80,74.36,86.7,66.93,93.58c-2.23,2.06-3.93,1.71-6-.21-7.55-7-15.27-13.84-22.77-20.89-6.46-6.07-7.93-15.23-4-23.34,3.8-8,10-11.17,19.11-10.25,3.39.35,5.91,2.16,8.25,4.24,1.77,1.58,2.95,2.07,4.93.17,5.7-5.49,12.47-5.84,19.37-2.82C92.08,43.23,96,50.71,96,56.53Z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Course;
