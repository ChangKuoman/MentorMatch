import React, { useState, useRef } from 'react';
import ErrorTextForm from './ErrorTextForm';
import '../css/LoginContent.css';
import url from './url.js';

import Img_mentor_match from "../icons/mentor-match.png"

function limpiarDatos(datos) {
  // Elimina caracteres especiales que puedan ser utilizados para inyectar código SQL
  datos = datos.replace(/;/g, ' ');
  datos = datos.replace(/'/g, ' ');
  datos = datos.replace(/"/g, ' ');
  datos = datos.replace(/%/g, ' ');
  datos = datos.replace(/\(/g, ' ');
  datos = datos.replace(/\)/g, ' ');

  return datos;
}

const LoginContent = () => {
  // Define estados para el correo y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [correoValido, setCorreoValido] = useState(null);
  const [contrasenaValida, setContrasenaValida] = useState(null);

  // Almacena una referencia al formulario
  const formRef = useRef(null);

  // Función para manejar cambios en el campo de correo
  const handleEmailChange = (e) => {
    setEmail(limpiarDatos(e.target.value));
  };

  // Función para manejar cambios en el campo de contraseña
  const handlePasswordChange = (e) => {
    setPassword(limpiarDatos(e.target.value));
  };

  // envia a registrarse
  const handleRegistrarse = () => {

  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // validacion si está ingresando un correo
    if (!email.trim()) {
      alert('Debe ingresar un correo electrónico.');
      return;
    }
    // validacion si está ingresando una contraseña
    if (!password.trim()) {
      alert('Debe ingresar una contraseña.');
      return;
    }

    // Valida que el correo contenga "@utec.edu.pe"
    if (!email.includes('@utec.edu.pe')) {
      setCorreoValido(false);
      return;
    }

    const body = {
      'email': email,
      'password': password,
    };

    console.log(body);
    const headers = {
      'Content-Type': 'application/json',
    };

    fetch(url + "/login", {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }).then(response => response.json())
      .then(data=> {
        console.log(data);
        if (data.status === 200){
          setCorreoValido(true);
          setContrasenaValida(true);

          const user = {
            email: email,
            password: password,
          };
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isLog', true);

          window.location.href = '/home';
        } else {
          console.log('El correo no existe');
          setCorreoValido(false);
          setContrasenaValida(false);
        }
      })
      .catch(error => {
        // Muestra un mensaje de error
        alert(error);
      });
  };

  return (
    <div className="Login">
      <div className="Frame1">
        <h1 className="title1">BIENVENIDOS A</h1>
      </div>
      <div className="Frame2"></div>
      <div className="login-content">
        <div className="login-form-group">
          <div className="form-header">
            <p className="title2">INICIE SESIÓN</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit} ref={formRef}>
            <div>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                className="login-input"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder= 'ejemplo@utec.edu.pe'
                required
              />
            </div >
            <ErrorTextForm texto="Este correo no existe" boolean={ correoValido }/>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder = "******************"
                required
              />
            </div>
            <ErrorTextForm texto="Contraseña incorrecta" boolean={ contrasenaValida }/>
            <button className='btn' type="submit">INICIAR SESIÓN</button>
          </form>
          <div className="form-footer">
            <div className="login-form-diveder">
              <p className="text-diveder">o</p>
            </div>
            <p className="text-form-footer">Aun no te has registrado? <a href='/register' onClick={handleRegistrarse}>Registrate aquí</a></p>
          </div>
        </div>
        <div className="panel-login">
          <p className="mentor-match-title">MENTOR MATCH</p>
          <img src={Img_mentor_match} alt = "Imagen de Login" className="img-login"/>
        </div>
        <div className="inf-mentor-match">
          <section className="inf-bloque">
            <section className="inf-header">
              <p>¿Qué es Mentor Match?</p>
            </section>
            <section className="inf-content">
              <p>
              MentorMatch es una plataforma web diseñada para fomentar la colaboración entre estudiantes en el intercambio de conocimientos, en base a sus fortalezas académicas.
              </p>
            </section>
          </section>
          <section className="inf-bloque">
            <section className="inf-header">
              <p>¿Quiénes somos?</p>
            </section>
            <section className="inf-content">
              <p>
              Somos un equipo interdiciplinario que buscamos eliminar las barreras de aprendizaje de nuestros compañeros por intermedio de un aplicativo.
              </p>
            </section>
          </section>
          <section className="inf-bloque">
            <section className="inf-header">
              <p>Beneficios de Mentor Match</p>
            </section>
            <section className="inf-content">
              <p>
              Algunos de los beneficios que se obtiene por el uso de la aplicación son:</p>
              <ul>
                <li>Aprendizaje colaborativo gratuito.</li>
                <li>Fácil acceso de asesorías.</li>
                <li>Se adapta al cronograma personal.</li>
              </ul>
            </section>
          </section>
        </div>
      </div>
      <div className="Frame3"></div>
      <div className="Frame4"></div>
    </div>
  );
};

export default LoginContent;
