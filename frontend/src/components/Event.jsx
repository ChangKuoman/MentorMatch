import React from "react";
import { useState, useEffect } from 'react';
import "../css/Event.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Rating from '@mui/material/Rating';
import url from './url.js';
// https://www.geeksforgeeks.org/how-to-create-popup-box-in-reactjs/

const headers = {
  'Content-Type': 'application/json',
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
          2: "COMPLETADO",
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
        const edad = añoActual - añoNacimiento;
        if (mesActual < mesNacimiento) {
          edad--;
        } else if (mesActual === mesNacimiento && diaActual < diaNacimiento) {
          edad--;
        }

        return edad;
      }

      const [userVisible, setUserVisible] = useState({
        "name": "Pepe",
        "surname": "El Grillo",
        "qualification": [1, 3],
        "description": "Nada",
        "tags": ["CS1515"],
        "birthDate": "2003/10/04"
      })

      function renderElement(email) {
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
        // HERE GOES FETCH

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

    return (
        <div>
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
                                      src="https://cdn.icon-icons.com/icons2/3395/PNG/512/loading_search_icon_214009.png"
                                      width={20}
                                      height={20}
                                  />}
                                  onOpen={() => getElement(event["email_giver"])}
                                  position="bottom center">
                                  {renderElement()}
                              </Popup>

                            <div className="tag-event">
                                {event.tag}
                            </div>
                        </div>

                        <div className="contenedor-boton">
                                  {getButton(event.state)}
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
                                      src="https://cdn.icon-icons.com/icons2/3395/PNG/512/loading_search_icon_214009.png"
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

                        <div className="contenedor-boton">
                            {event.state === 0 ? getButtonsWaiting(event.uuid) : event.state === 1 ? getButtonsCulminar(event.uuid) : getButton(event.state)}
                        </div>
                    </div>
                ))
                }

            </div>

        </div>
    )
}

export default Event;
