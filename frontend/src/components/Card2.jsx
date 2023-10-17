import React from "react";
import { useState, useEffect, useRef } from 'react';
import Rating from '@mui/material/Rating';
import "../css/Card2.css"

const Card = () => {
    const lastItemRef = useRef(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([
            {
                "email": "juan.perez@example.com",
                "name": "Juan",
                "surname": "Pérez",
                "birthDate": "1990/01/01",
                "description": "Soy un desarrollador de software con 5 años de experiencia.",
                "verified": true,
                "qualification": [4, 5],
                "chats": ["chat_id_1", "chat_id_2"],
                "tags": ["software", "desarrollo", "java", "python"],
                "photo": "https://example.com/juan-perez.png",
                "events-r": ["event_id_1", "event_id_2"],
                "events-g": ["event_id_3", "event_id_4"]
              },
              {
                "email": "maria.garcia@example.com",
                "name": "María",
                "surname": "García",
                "birthDate": "1991/02/02",
                "description": "Soy una diseñadora gráfica con 3 años de experiencia.",
                "verified": true,
                "qualification": [5, 5],
                "chats": ["chat_id_3", "chat_id_4"],
                "tags": ["diseño", "gráfico", "adobe", "photoshop"],
                "photo": "https://example.com/maria-garcia.png",
                "events-r": ["event_id_1", "event_id_3"],
                "events-g": ["event_id_2", "event_id_4"]
              },
              {
                "email": "pedro.sanchez@example.com",
                "name": "Pedro",
                "surname": "Sánchez",
                "birthDate": "1992/03/03",
                "description": "Soy un ingeniero civil con 2 años de experiencia.",
                "verified": true,
                "qualification": [4, 4],
                "chats": ["chat_id_5", "chat_id_6"],
                "tags": ["ingeniería", "civil", "construcción", "autocad"],
                "photo": "https://example.com/pedro-sanchez.png",
                "events-r": ["event_id_2", "event_id_4"],
                "events-g": ["event_id_1", "event_id_3"]
              },
              {
                "email": "ana.martinez@example.com",
                "name": "Ana",
                "surname": "Martínez",
                "birthDate": "1993/04/04",
                "description": "Soy una abogada con 1 año de experiencia.",
                "verified": true,
                "qualification": [5, 5],
                "chats": ["chat_id_7", "chat_id_8"],
                "tags": ["derecho", "abogacía", "leyes", "civil"],
                "photo": "https://example.com/ana-martinez.png",
                "events-r": ["event_id_3", "event_id_4"],
                "events-g": ["event_id_1", "event_id_2"]
              },
              {
                "email": "david.fernandez@example.com",
                "name": "David",
                "surname": "Fernández",
                "birthDate": "1994/05/05",
                "description": "Soy un médico con 6 meses de experiencia.",
                "verified": false,
                "qualification": [5, 5],
                "chats": ["chat_id_9", "chat_id_10"],
                "tags": ["medicina", "salud", "médico", "general"],
                "photo": "https://example.com/david-fernandez.png",
                "events-r": ["event_id_4", "event_id_1"],
                "events-g": ["event_id_2", "event_id_3"]
              }
        ]
          )
    }, [])

    useEffect(() => {
        if (lastItemRef.current) {
          // Aquí puedes acceder al elemento lastItemRef.current para realizar operaciones en el DOM
          console.log(lastItemRef.current);
        }
      }, [lastItemRef]);

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

      const soundLike = new Audio('like.mp3');
      const soundHate = new Audio('hate.mp3');


    const Like = () => {
        console.log("like")
        soundLike.play();

       setUsers(users.slice(0, users.length - 1));
       console.log(lastItemRef.current); // This will log the last element to the console.

    };

    const Hate = () => {
        console.log("dislike")
        soundHate.play();

       setUsers(users.slice(0, users.length - 1));

        console.log(lastItemRef.current); // This will log the last element to the console.
    };



    return (
        <div>
            <div className="container">
                {users.map((user) => (
                    <div key={user.email} className="swipe" ref={user.email === users[users.length - 1].email ? lastItemRef : null}>
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
                    </div>
                ))}
            </div>
            <div className="contenedor-iconos-l-h">
                <div className="icons">
                    <svg onClick={Hate} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.07 127.89">
                        <path className="a" d="M128.07,64.07c-.5,36.31-28,63.57-64,63.82S-.17,99.33,0,63.29C.17,28.25,29.23-.3,64.43,0A63.88,63.88,0,0,1,128.07,64.07ZM45.32,38.54c-2.44.36-4.63,1.12-6,3.68a6.39,6.39,0,0,0,.94,7.83A143,143,0,0,0,50.42,60.36c2.73,2.48,3.44,4.31.2,7a98.44,98.44,0,0,0-9.52,9.53c-3.62,4-3.66,7.48-.47,10.59,2.82,2.76,7.12,2.54,10.7-.79,3.05-2.83,5.91-5.86,8.85-8.8,2.58-2.57,5.16-2.53,7.73,0,2.83,2.81,5.62,5.67,8.52,8.42,3.87,3.68,8.08,4.08,11,1.15,3.23-3.21,3-6.85-.83-11C83.57,73.21,80.44,70,77.1,67c-2.37-2.13-2.71-3.65-.13-5.91,3.24-2.85,6.15-6.08,9.2-9.15,4.17-4.2,4.66-8,1.45-11.34-2.93-3-7.58-2.61-11.49,1.19-3.34,3.25-6.66,6.52-9.85,9.91-1.64,1.74-2.85,1.73-4.49,0-3.32-3.5-6.84-6.81-10.21-10.26A9,9,0,0,0,45.32,38.54Z"/>
                        <path d="M45.32,38.54a9,9,0,0,1,6.26,2.87c3.37,3.45,6.89,6.76,10.21,10.26,1.64,1.73,2.85,1.74,4.49,0,3.19-3.39,6.51-6.66,9.85-9.91C80,38,84.69,37.52,87.62,40.57c3.21,3.34,2.72,7.14-1.45,11.34-3,3.07-6,6.3-9.2,9.15-2.58,2.26-2.24,3.78.13,5.91,3.34,3,6.47,6.24,9.53,9.52,3.87,4.16,4.06,7.8.83,11-2.95,2.93-7.16,2.53-11-1.15-2.9-2.75-5.69-5.61-8.52-8.42-2.57-2.54-5.15-2.58-7.73,0-2.94,2.94-5.8,6-8.85,8.8-3.58,3.33-7.88,3.55-10.7.79-3.19-3.11-3.15-6.6.47-10.59a98.44,98.44,0,0,1,9.52-9.53c3.24-2.72,2.53-4.55-.2-7A143,143,0,0,1,40.28,50.05a6.39,6.39,0,0,1-.94-7.83C40.69,39.66,42.88,38.9,45.32,38.54Z"/>
                    </svg>
                    <svg onClick={Like} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.06 127.99">
                        <path className="a" d="M128.06,63.83a63.65,63.65,0,0,1-64,64.16A63.57,63.57,0,0,1,0,64a64,64,0,0,1,128.06-.13ZM96,56.53c0-5.82-3.9-13.3-10.19-16.05-6.9-3-13.67-2.67-19.37,2.82-2,1.9-3.16,1.41-4.93-.17-2.34-2.08-4.86-3.89-8.25-4.24-9.13-.92-15.31,2.3-19.11,10.25-3.89,8.11-2.42,17.27,4,23.34,7.5,7,15.22,13.88,22.77,20.89,2.06,1.92,3.76,2.27,6,.21C74.36,86.7,82,80,89.39,73.09,93.57,69.21,96.06,64.45,96,56.53Z"/>
                        <path d="M96,56.53c.08,7.92-2.41,12.68-6.59,16.56C82,80,74.36,86.7,66.93,93.58c-2.23,2.06-3.93,1.71-6-.21-7.55-7-15.27-13.84-22.77-20.89-6.46-6.07-7.93-15.23-4-23.34,3.8-8,10-11.17,19.11-10.25,3.39.35,5.91,2.16,8.25,4.24,1.77,1.58,2.95,2.07,4.93.17,5.7-5.49,12.47-5.84,19.37-2.82C92.08,43.23,96,50.71,96,56.53Z"/>
                    </svg>
                </div>
            </div>

        </div>
    )
};

export default Card;
