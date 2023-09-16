import React, { useState, useRef } from 'react';
import '../css/LoginContent.css';

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
      alert('El correo ingresado no es un correo institucional.');
      return;
    }    

    // prueba de conexion con la api de la bd
    console.log("prueba ",email,password);
    const url = `https://fjmjpibq48.execute-api.us-east-1.amazonaws.com/test/login`;
    const body = {
      'email': email,
      'password': password,
    };

    console.log(body);
    const headers = {
      'Content-Type': 'application/json',
    };
    
    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        'email': email,
        'password': password,
      }),
    }).then(response => response.json())
      .then(data=> {
        console.log(data);
        if (data.status === 200){

        } else {
          alert ('El correo no existe');
        }
      })
      .catch(error => {
        // Muestra un mensaje de error
        alert(error);
      });
  };

  return (
    <div className="login-content">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder= 'ejemplo@utec.edu.pe'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            className='form-Control'
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder = "******************"
            required
          />
        </div>
        <button className='btn' type="submit">Iniciar Sesión</button>
        <p>Aun no te has registrado?<a href='/register' className='btn btn-link' onClick={handleRegistrarse}>Registrate aquí</a> </p>
      </form>
    </div>
  );
};

export default LoginContent;