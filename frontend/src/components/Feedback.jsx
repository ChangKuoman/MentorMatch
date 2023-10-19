import React from "react";
import { useState, useEffect } from 'react';
import "../css/Feedback.css"
import url from './url.js';
import Rating from '@mui/material/Rating';

const headers = {
  'Content-Type': 'application/json',
};

const Feedback = () => {

    const [comment, setComment] = useState("")
    const [value, setValue] = useState(0)

    const handleComment = (e) => {
        setComment(e.target.value);
    };

    function enviarForm(e) {
        e.preventDefault()

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
    }

    return (
        <div>
                <div className="contenedor">
                    <div className="contenedor-chico">
                    <div className="titulo-feedback">Feedback</div>
                    <div>Déjanos tu opinión para seguir mejorando</div>
                    <form>
                        <div className="mini-text">Comentario</div>

                        <div>
                            <textarea onChange={handleComment} className="input-texto" />
                        </div>

                        <div className="mini-text">Valoración de la página</div>
                        <Rating
                            value={value}
                            size="large"
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <button className="boton-feedback" onClick={(e) => enviarForm(e)}>ENVIAR</button>
                    </form>
                    </div>

                </div>
        </div>
    )
}

export default Feedback;