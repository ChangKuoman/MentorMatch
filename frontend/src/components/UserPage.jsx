import React, {useState, useEffect} from "react";
import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';
import url from './url.js';
import '../css/UserPage.css'
import Rating from '@mui/material/Rating';


import Logo from "./Logo";
import LogoUser from '../icons/icons8-user-64.png';
import LogoLogOut from '../icons/icons8-logout-100.png';

const headers = {
    'Content-Type': 'application/json',
};

function setQualification(q) {
    const cant = q[0];
    const sum = q[1];
    if (cant == 0){ return 0; }
    else {
        return sum / cant;
    }
}

const getLogOutPosition = () => {
    const logOutElement = document.querySelector(".botones-nav");
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
      x: logOutX - 140 + logOutWidth/2,
      y: logOutY + logOutHeight,
    };
};

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

    const [usuario, setUsuario] = useState([])

    useEffect(() => {
        async function fetchData() {
            const user = JSON.parse(localStorage.getItem('user'));
            const email = user.email;

            fetch(url + "/get-users", {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  'emails': [email]
                }),
              }).then(response => response.json())
                .then(data=> {
                  if (data.status === 200){
                    setUsuario(data.users)
                } else {
                  }
                })
                .catch(error => {
                });
        }
        fetchData();
    }, [])


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
                    hidden
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
            <div onMouseEnter={handleMouseEnter} className="Open-nave"></div>
            <div className={`nav${isVisible ? '' : 'hidden'}`}>
                <img src = {BotonBack} alt = "Boton de regreso" className="boton-regreso" onClick={handleBackClick}/>
                <img src = {BotonHome} alt = "Boton de home" className="boton-home" onClick={handleHomeClick}/>
            </div>
            {usuario.map((user)=>(
            <div className="user-content" key={user.email}>
                <div className="data">
                    <p>Nombre</p>
                    <section className="info">{user.name}</section>
                </div>
                <div className="data">
                    <p>Apellido</p>
                    <section className="info">{user.surname}</section>
                </div>
                <div className="data">
                    <p>Correo</p>
                    <section className="info">{user.email}</section>
                </div>
                <div className="data">
                    <p>Año de Nacimiento</p>
                    <section className="info">{user.birthDate}</section>
                </div>
                <div className="data">
                    <p>Descripción</p>
                    <section className="info">{user.description}</section>
                </div>
                <div className="data">
                    <p>Calificación</p>
                    <Rating defaultValue={setQualification(user.qualification)} precision={0.5} readOnly />
                </div>
                <div className="data">
                    <p>Tags</p>
                    <div className="contenedor-tags">
                        {user.tags.map((tag) => (
                            <div key= {tag} className="tag">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            ))}

        </div>
    )
};

export default UserPage;