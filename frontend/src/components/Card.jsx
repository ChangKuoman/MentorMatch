import React from "react";
import TinderCard from 'react-tinder-card'
import { useState, useEffect } from 'react';
import "../css/Card.css"
import Rating from '@mui/material/Rating';
// https://mui.com/material-ui/react-rating/

// https://mustakimgodil23.medium.com/how-to-create-tinder-cards-in-reactjs-6ce7942ca655
// https://github.com/3DJakob/react-tinder-card
// https://github.com/Mustakim-78/tinder-card/blob/master/src/App.css

const Card = () => {
    const my_email = "samanta.chang@utec.edu.pe";

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

    const url = "https://oo3m2to3bi.execute-api.us-east-1.amazonaws.com/test";
    const headers = {
      'Content-Type': 'application/json',
    };

    const [users, setUsers] = useState([])
    const [validUsers, setValidUsers] = useState([])
    const [tag, setTag] = useState('none')

    useEffect(() => {
        async function fetchData() {
            fetch(url + "/get-matching-users", {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  'email': my_email
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

      function swiped(direction, email){
        // remove from general users
        const newList = users.filter((user) => user.email !== email)
        setUsers(newList)

        if (direction === 'right') {
            // RIGHT - LIKE
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
                    } else {
                    }
                })
                .catch(error => {
                });
        }
        else {
            // LEFT - DISLIKE
        }
      }
      function leftScreen(name){
        //console.log(name)
      }

      function setQualification(q) {
        const cant = q[0];
        const sum = q[1];
        if (cant == 0){ return 0; }
        else {
            return sum / cant;
        }
      }

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
    };

    return (
        <div>
            <div className="contenedor-filtro">
                <div className="texto-filtro">Filtro de cursos</div>
                <select className="classic" onChange={manejarTag}>
                    <option value="none">Todos</option>
                    <option value="Python">Python</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="Rust">Rust</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Dart">Dart</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="Vuejs">Vuejs</option>
                    <option value="React">React</option>
                    <option value="Swift">Swift</option>
                </select>
            </div>


            <div className="container">
            {validUsers.map((user) => (
                    <TinderCard
                        key = {user.email}
                        className="swipe"
                        preventSwipe = {['up','down']}
                        onSwipe = {(direction) => swiped(direction, user.email)}
                        onCardLeftScreen = {() => leftScreen(user.email)}
                    >
                        <div className="card">
                            <div className="contenedor-grande">
                                <div className="div-izquierda">
                                    <img className={user.verificado ? "imagen-pfp dorado" : "imagen-pfp"} src="https://d3ipks40p8ekbx.cloudfront.net/dam/jcr:3a4e5787-d665-4331-bfa2-76dd0c006c1b/user_icon.png" />
                                    <div className="contenedor-titulo">
                                        <h3>{user.name} {user.surname} - {calcularEdad(user.birthDate)}</h3>
                                    </div>
                                    <Rating defaultValue={setQualification(user.qualification)} precision={0.5} readOnly />
                                </div>
                                <div className="div-derecha">
                                    <div className="tag-title">Acerca de mí</div>
                                    <div className="contenedor-descripcion">{user.description}</div>

                                    <div className="tag-title">Cursos que domino</div>
                                    <div className="contenedor-tags">
                                        {user.tags.map((tag) => (
                                            <div key= {tag} className="tag">
                                                {tag}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>


                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
};

export default Card;
