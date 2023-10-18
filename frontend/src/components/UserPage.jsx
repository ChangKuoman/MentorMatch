import React, {useState} from "react";
import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';
import url from './url.js';

import '../css/UserPage.css'

function getUserData(email) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': [email]
      }),
    };

    return fetch(url + "/get-users", options).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Error al obtener datos del usuario: ${response.status}`);
      }
    });
}

const UserPage = () => {
    // Define un estado para controlar la visibilidad del nav
    const [isVisible, setIsVisible] = useState(false);

    // Manejador del evento `onMouseEnter` del elemento `.frame2`
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

    const user = JSON.parse(localStorage.getItem('user'));
    const email = user.email;
    const userData = getUserData(email);

    const [nameUser, setNameUser] = useState('');

    userData.then((data) => {
        const userD = data;
        const dataUser = userD.data[0];

        const nameUser = dataUser.name;
        setNameUser(nameUser);
    });

    return (
        <div className="UserPage" onMouseLeave={handleMouseLeave}>
            <div className="frame1">
                <p>MENTOR MATCH</p>
            </div>
            <div className="frame2"></div>
            <div onMouseEnter={handleMouseEnter} className="Open-nave"></div>
            <div className={`nav${isVisible ? '' : 'hidden'}`}>
                <img src = {BotonBack} alt = "Boton de regreso" className="boton-regreso" onClick={handleBackClick}/>
                <img src = {BotonHome} alt = "Boton de home" className="boton-home" onClick={handleHomeClick}/>
            </div>
            <div className="user-content">
                <div className="data">
                    <p>Nombre</p>
                    <section className="info">{nameUser}</section>
                </div>
                <div className="data">
                    <p>Correo</p>
                    <section className="info">{email}</section>
                </div>
            </div>
        </div>
    )
};

export default UserPage;