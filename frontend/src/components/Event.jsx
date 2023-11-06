import React from "react";
import Logo from "./Logo";
import { useState, useEffect } from 'react';
import "../css/Event.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Rating from '@mui/material/Rating';
// https://www.geeksforgeeks.org/how-to-create-popup-box-in-reactjs/

import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';
import LogoLogOut from '../icons/icons8-logout-100.png';
import LogoUser from '../icons/icons8-user-64.png';

import SearchIcon from '../icons/search.png'

import { url, headers } from './utils.js'

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


const Event = () => {

  const [events_g, setEventsG] = useState([])
  const [events_r, setEventsR] = useState([])

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
                // FETCH 1
                fetch(url + "/get-events", {
                  method: 'POST',
                  headers,
                  body: JSON.stringify({
                    'events': data.users[0]["events-r"]
                  }),
                }).then(response2 => response2.json())
                  .then(data2 => {
                    if (data2.status === 200){
                      setEventsR(data2.events)
                    }
                  })
                  .catch(error => {
                  });
                  // FETCH 2
                fetch(url + "/get-events", {
                  method: 'POST',
                  headers,
                  body: JSON.stringify({
                    'events': data.users[0]["events-g"]
                  }),
                }).then(response3 => response3.json())
                  .then(data3 => {
                    if (data3.status === 200){
                      setEventsG(data3.events)
                    }
                  })
                  .catch(error => {
                  });

            } else {
              }
            })
            .catch(error => {
            });
    }

    fetchData();
    }, []);


    function getButton(state) {
        const colors = {
          0: "boton-event  yellow",
          1: "boton-event  green",
          2: "boton-event  blue",
          3: "boton-event red",
        };
        const texts = {
          0: "EN ESPERA",
          1: "EN PROCESO",
          2: "CULMINADO",
          3: "RECHAZADO",
        };

        return (
          <button className={colors[state]} disabled>
            {texts[state]}
          </button>
        );
      };

      function nuevoEstado(uuid, newState) {
        fetch(url + "/event-state", {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            'uuid': uuid,
            'new_state': newState
          }),
        }).then(response => response.json())
          .then(data=> {
            const evento = events_g.find((evento) => evento.uuid === uuid);
            evento.state = newState;
            setEventsG([...events_g]);
          })
          .catch(error => {
          });
      }

    function getButtonsWaiting(uuid) {
        return (
            <div className="botones-elect">
                <button className={"boton-event green aceptar"} onClick={() => nuevoEstado(uuid, 1)}>ACEPTAR</button>
                <button className={"boton-event red rechazar"} onClick={() => nuevoEstado(uuid, 3)}>RECHAZAR</button>
            </div>
        )
    }

    function getButtonsCulminar(uuid) {
      return (
          <div className="botones-elect">
              <button className={"boton-event blue culminar"} onClick={() => nuevoEstado(uuid, 2)}>CULMINAR</button>
              <button className={"boton-event green"}>EN PROCESO</button>
          </div>
      )
  }

    function getButtonAndQualification(reserva) {
      return (
        <div className="botones-elect">
        {!reserva.qualified && <Rating
          className="estrellas"
          value={null}
          disabled={false}
          onChange={(event, newValue) => {
            // deletes rating
            event.target.parentNode.style.display = 'none';
            // fetch
            fetch(url + "/user-qualify", {
              method: 'POST',
              headers,
              body: JSON.stringify({
                'event': reserva.uuid,
                'qualification': newValue,
                'email': reserva["email_giver"]
              }),
            }).then(response => response.json())
              .then(data=> {
                console.log(data)
              })
              .catch(error => {
              });
          }}
        />}
          <button className={"boton-event blue"}>CULMINADO</button>
        </div>
      )
    }

      function setQualification(q) {
        const cant = q[0];
        const sum = q[1];
        if (cant == 0){ return 0; }
        else {
            return sum / cant;
        }
      }
      function calcularEdad(fechaNacimiento) {
        // Obtener la fecha actual
        const fechaActual = new Date();

        // Obtener el año, mes y día de la fecha de nacimiento
        const añoNacimiento = fechaNacimiento.split("/")[0];
        const mesNacimiento = fechaNacimiento.split("/")[1];
        const diaNacimiento = fechaNacimiento.split("/")[2];

        // Obtener el año, mes y día de la fecha actual
        const añoActual = fechaActual.getFullYear();
        const mesActual = fechaActual.getMonth() + 1;
        const diaActual = fechaActual.getDate();

        // Calcular la edad
        let edad = añoActual - añoNacimiento;
        if (mesActual < mesNacimiento) {
          edad--;
        } else if (mesActual === mesNacimiento && diaActual < diaNacimiento) {
          edad--;
        }

        return edad;
      }

      const userLorem = {
        "name": "Lorem",
        "surname": "ipsum",
        "qualification": [0, 0],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "tags": ["Lorem", "ipsum", "dolor", "sit", "amet"],
        "birthDate": "2000/01/01"
      }

      const [userVisible, setUserVisible] = useState(userLorem)

      function resetElement() {
        setUserVisible(userLorem)
      }

      function renderElement() {
        return (
          <div className="contendor-evento-desc">
              <div className="contenedor-titulo">
                  <h3>{userVisible.name} {userVisible.surname} - {calcularEdad(userVisible.birthDate)}</h3>
              </div>
              <Rating value={setQualification(userVisible.qualification)} precision={0.5} readOnly />

              <div className="tag-title">Acerca de mí</div>
              <div className="contenedor-descripcion">{userVisible.description}</div>

              <div className="tag-title">Cursos que domino</div>
              <div className="contenedor-tags">
                  {userVisible.tags.map((tag) => (
                      <div key= {tag} className="tag">
                          {tag}
                      </div>
                  ))}
              </div>
          </div>
      )
      }

    function getElement(email) {
        fetch(url + "/get-users", {
          method: 'POST',
          headers,
          body: JSON.stringify({
            'emails': [email]
          }),
        }).then(response => response.json())
          .then(data=> {
            if (data.status === 200 && data.total === 1){
              setUserVisible(data.users[0]);
          } else {
            }
          })
          .catch(error => {
          });
    }

    const [botonSeleccionado, setBoton] = useState(true);

    function manejarClickBoton () {
        setBoton(!botonSeleccionado);
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
            <div className="content-reservas">
              <div className="contenedor-botones-event">
                  <button className={botonSeleccionado ? "boton-event s seleccionado": "boton-event s"} onClick={manejarClickBoton}>Enviados</button>
                  <button className={!botonSeleccionado ? "boton-event s seleccionado": "boton-event s"} onClick={manejarClickBoton}>Recibidos</button>
              </div>

              <div className="contenedor-tags-event">
                  {botonSeleccionado ?
                  events_r.map((event) => (
                      <div className="box-event" key= {event.uuid} >
                          <div className="contenedor-evento-header">
                              <div className="nombre">
                                  {event["email_giver"]}
                              </div>
                                <Popup trigger=
                                    {<img
                                        src={SearchIcon}
                                        width={20}
                                        height={20}
                                    />}
                                    onOpen={() => getElement(event["email_giver"])}
                                    onClose={() => resetElement()}
                                    position="bottom center">
                                    {renderElement()}
                                </Popup>

                              <div className="tag-event">
                                  {event.tag}
                              </div>
                          </div>

                          <div className="contenedor-boton-2">
                              {event.state === 2 ? getButtonAndQualification(event): getButton(event.state)}
                          </div>
                      </div>
                  ))
                  :
                  events_g.map((event) => (
                      <div className="box-event" key= {event.uuid} >
                          <div className="contenedor-evento-header">
                              <div className="nombre">
                                  {event["email_receiver"]}
                              </div>
                              <Popup trigger=
                                    {<img
                                        src={SearchIcon}
                                        width={20}
                                        height={20}
                                    />}
                                    onOpen={() => getElement(event["email_receiver"])}
                                    position="bottom center">
                                    {renderElement()}
                                </Popup>
                              <div className="tag-event">
                                  {event.tag}
                              </div>
                          </div>

                          <div className="contenedor-boton-2">
                              {event.state === 0 ? getButtonsWaiting(event.uuid) : event.state === 1 ? getButtonsCulminar(event.uuid) : getButton(event.state)}
                          </div>
                      </div>
                  ))
                  }

              </div>
            </div>
        </div>
    )
}

export default Event;
