import React from 'react';
import { useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { url } from './utils.js'
import "../css/Admin.css"

import Logo from "./Logo";
import LogoUser from '../icons/icons8-user-64.png';
import LogoLogOut from '../icons/icons8-logout-100.png';
import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';

import {headers, listaCursos, setQualification, hallarImagen, getLogOutPosition } from './utils.js';



function Admin() {
  const [csvData, setCsvData] = useState([]);
  const [filename, setFilename] = useState('my-file.csv');
  const [show, setShow] = useState(false);

  function descargarDesdeDynamoDB(endpoint) {
      const lambdaURL = url + '/csv/' + endpoint;

      fetch(lambdaURL)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setCsvData(data);
          setFilename(endpoint + '.csv')
          setShow(true);
        })
  }

  const [logOutPosition, setLogOutPosition] = useState(getLogOutPosition());
  const [IsOpen, setIsOpen] = useState(false);

  const accessUser = () => {
      window.location.href = '/user/';
  }

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
  const [isVisible, setIsVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleHomeClick = () => {
      window.location.href = '/home';
  }

  const handleBackClick  = () => {
      window.location.href = '/home';
  }

  const handleMouseLeave = () => {
      setIsVisible(false);
  };


    return (
      <div className="UserPage" onMouseLeave={handleMouseLeave}>
        <div className="frame1"></div>
        <div className="frame2"></div>
        <div className="HeaderHome">
          <Logo className = 'Logo'/>
            <h1>MentorMatch</h1>
            <div className="botones-nav">
            <img src = {LogoUser}
                alt="logo user"
                className="LogoLogOut hidden"
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
        <div onMouseEnter={handleMouseEnter} className="Open-nave"></div>
        <div className={`nav${isVisible ? '' : 'hidden'}`}>
          <img src = {BotonBack} alt = "Boton de regreso" className="boton-regreso" onClick={handleBackClick}/>
          <img src = {BotonHome} alt = "Boton de home" className="boton-home" onClick={handleHomeClick}/>
        </div>

        <div className="admin-nav-ac">
          <div className='contenedor-boton-descarga'>
            <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('register')}>Fecha Creación Usuarios</button>
            <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('event')}>Fecha Creación Eventos</button>
            <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('qualification')}>Calificaciones Mentor Match</button>
            <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('login')}>Login Usuarios</button>
            <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('state')}>Cambio de Estado</button>
          </div>
          {
            show && <div className='contenedor-boton-descarga-15'>
            <CSVLink
                onClick={() => setShow(false)}
                className='boton-descarga-15'
                data={csvData}
                enclosingCharacter={`"`}
                filename={filename}
                separator={"%%%"}
              >Descargar .cvs</CSVLink>
            </div>
          }
        </div>
      </div>
    );
}

export default Admin;
