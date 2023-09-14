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

  const mostrarError = (mensaje) => {
    alert(mensaje);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor o realizar la autenticación.
    // Puedes usar 'email' y 'password' para eso.

    // Valida los datos de entrada del formulario
    if (!email.trim()) {
      alert('Debe ingresar un correo electrónico.');
      return;
    }

    if (!password.trim()) {
      alert('Debe ingresar una contraseña.');
      return;
    }

    // Valida que el correo contenga "@utec.edu.pe"
    if (!email.includes('@utec.edu.pe')) {
      alert('El correo ingresado no es un correo institucional.');
      return;
    }

    // Envía los datos de inicio de sesión al servidor o realiza la autenticación

    const usuarios = require("./data.json")

    const correo = email;
    const contraseña =  password;

    const usuarioEncontrado = usuarios.find((usuario) => {
      return usuario.correo === correo && usuario.contraseña === contraseña;
    });
    if (usuarioEncontrado) {
      console.log("Incio de sesion exitoso de: " + email)
    } else {
      alert('El correo no existe.');
    }

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
      </form>
    </div>
  );
};

export default LoginContent;
