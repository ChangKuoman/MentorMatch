import React from "react";
import { useState, useEffect } from 'react';
import "../css/Register.css"
import url from './url.js';

import Img_mentor_match from "../icons/mentor-match.png"
import ojo_cerrado from "../icons/icons8-closed-eye-100.png"
import ojo_abierto from "../icons/icons8-eye-100.png"

const headers = {
  'Content-Type': 'application/json',
};

const Register = () => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [documentType, setDocumentType] = useState("DNI")
    const [documentNro, setDocumentNro] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [birthDate, setBirthDate] = useState("")

    const [terminos, setTerminos] = useState(false)
    const [terminosValid, setTerminosValid] = useState(true)

    const [emailValid, setEmailValid] = useState(true)
    const [nameValid, setNameValid] = useState(true)
    const [surnameValid, setSurnameValid] = useState(true)
    const [documentNroValid, setDocumentNroValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true)
    const [birthDateValid, setBirthDateValid] = useState(true)    

    const handleChange = (event) => {
        setEmailValid(true)
        setNameValid(true)
        setSurnameValid(true)
        setDocumentNroValid(true)
        setTerminosValid(true)
        setPasswordValid(true)
        setConfirmPasswordValid(true)
        setBirthDateValid(true)

        const { name, value } = event.target;
        switch (name) {
          case "email":
            setEmail(value);
            break;
          case "name":
            setName(value);
            break;
          case "surname":
            setSurname(value);
            break;
          case "documentType":
            setDocumentType(value);
            break;
          case "documentNro":
            setDocumentNro(value);
            break;
          case "password":
            setPassword(value);
            break;
          case "confirmPassword":
            setConfirmPassword(value);
            break;
          case "birthDate":
            setBirthDate(value);
            break;
          case "terminos":
            setTerminos(!terminos);
            break;
          default:
            break;
        }
      };

      function inputsCorrect() {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        const utec = "@utec.edu.pe"
        const documentNroPattern = /^\d+$/
        const passwordValid = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/
        let conforme = true;

        if (!email.endsWith(utec)) {
            conforme = false;
            setEmailValid(false)
        }
        if (name == '') {
            conforme = false;
            setNameValid(false)
        }
        if (surname == '') {
            conforme = false;
            setSurnameValid(false)
        }
        if (!documentNroPattern.test(documentNro) || (documentType === "DNI" && documentNro.length !== 8) || (documentType === "CE" && documentNro.length !== 9)) {
            conforme = false;
            setDocumentNroValid(false)
        }
        if (terminos == false) {
            conforme = false;
            setTerminosValid(false)
        }
        if (!passwordValid.test(password)) {
            conforme = false;
            setPasswordValid(false)
        } else if (password !== confirmPassword) {
            conforme = false;
            setConfirmPasswordValid(false)
        }

        const today = new Date();
        const bDate = new Date(birthDate);

        const añoNacimiento = bDate.getFullYear();
        const mesNacimiento = bDate.getMonth() + 1;
        const diaNacimiento = bDate.getDate() + 1;

        const añoActual = today.getFullYear();
        const mesActual = today.getMonth() + 1;
        const diaActual = today.getDate();

        // Calcular la edad
        let age = añoActual - añoNacimiento;
        if (mesActual < mesNacimiento) {
            age--;
        } else if (mesActual === mesNacimiento && diaActual < diaNacimiento) {
            age--;
        }

        if (!(age >= 16 && age < 100)) {
            conforme = false;
            setBirthDateValid(false)
        }

        if (conforme) {
            return true;
        }
        return false;
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        // INCORRECT INPUTS
        if (inputsCorrect())  {
            // FORMAT TO FETCH
            const formattedBirthDate = birthDate.replace(/-/g, "/");
            fetch(url + '/register', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  'email': email,
                  'name': name,
                  'surname': surname,
                  'documentType': documentType,
                  'documentNro': documentNro,
                  'password': password,
                  'birthDate': formattedBirthDate
                }),
              }).then(response => response.json())
                .then(data=> {
                    if (data.status === 200) {
                        alert("Registro con éxito")
                        window.location.href = "/"
                    }
                    else if (data.status === 400) {
                        if (data.error === "Document already exists") {
                            alert("El documento ya existe")
                        }
                        else if (data.error === "Email and Document already exists") {
                            alert("El correo y el documento ya existen")
                        }
                        else if (data.error === "Email already exists") {
                            alert("El correo ya existe")
                        }
                    }
                })
                .catch(error => {
                });
        }
    };

    // logica para el ojito
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    
        // Cambia la imagen de ojo cerrado a ojo abierto como una animación
        if (showPassword) {
        const img = document.querySelector(".eye-ac");
        img.style.transform = "scale(1)";
        img.style.transition = "transform 0.5s ease";
        } else {
        const img = document.querySelector(".eye-ac");
        img.style.transform = "scale(1.2)";
        img.style.transition = "transform 0.5s ease";
        }
    };

    return (
        <div>
            <div className="Frame1">
                <h1 className="title1">BIENVENIDOS A</h1>
            </div>
            <div className="Frame2"></div>
            <div className="contenedor-formulario">

            <form className="formulario" onSubmit={handleSubmit}>
            <label className="labels">Correo electrónico</label>
            <input
                className="input-texto-register"
                type="text"
                name="email"
                value={email}
                placeholder="ejemplo@utec.edu.pe"
                onChange={handleChange}
            />
            {
                !emailValid && <p className="error-form-text">Ingrese un correo válido utec</p>
            }
            <label className="labels">Nombre</label>
            <input
                className="input-texto-register"
                type="text"
                name="name"
                value={name}
                placeholder="John"
                onChange={handleChange}
            />
            {
                !nameValid && <p className="error-form-text">El atributo nombre es requerido</p>
            }
            <label className="labels">Apellido</label>
            <input
                className="input-texto-register"
                type="text"
                name="surname"
                value={surname}
                placeholder="Doe"
                onChange={handleChange}
            />
            {
                !surnameValid && <p className="error-form-text">El atributo apellido es requerido</p>
            }

                <label className="labels">Documento de identidad</label>
                <div className="contenedor-documentos">
                    <select className="documento-izquierda" name="documentType" onChange={handleChange}>
                        <option value="DNI">DNI</option>
                        <option value="CE">CE</option>
                    </select>
                    <input
                        className="input-texto-register documento-derecha"
                        type="text"
                        name="documentNro"
                        value={documentNro}
                        placeholder="01234567"
                        onChange={handleChange}
                    />
                </div>
                {
                    !documentNroValid && <p className="error-form-text">El número de documento debe ser válido</p>
                }
                <label className="labels">Contraseña</label>
                <div className="input-password-ac">
                    <input
                        className="input-texto-register"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        placeholder="***"
                        onChange={handleChange}
                    />
                    {showPassword ? 
                    <img onClick={handleShowPassword} className='eye-ac' src={ojo_abierto} alt = "ojo_abierto" /> :
                    <img onClick={handleShowPassword} className='eye-ac' src={ojo_cerrado} alt = "ojo cerrado" />
                    }
                    {
                        !passwordValid && <p className="error-form-text">La contraseña debe como mínimo 8 caracteres, una mayúscula y un dígito</p>
                    }
                </div>
                <label className="labels">Confirmar contraseña</label>
                <input
                    className="input-texto-register"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="***"
                    onChange={handleChange}
                />
                {
                    !confirmPasswordValid && <p className="error-form-text">Las contraseñas deben coincidir</p>
                }
                <label className="labels">Fecha de nacimiento</label>
                <input
                    className="input-texto-register"
                    type="date"
                    name="birthDate"
                    value={birthDate}
                    onChange={handleChange}
                />
                {
                    !birthDateValid && <p className="error-form-text">Debe ser mayor de 16 para usar nuestros servicios</p>
                }
                <div className="contenedor-terminos">
                    <input type="checkbox" name="terminos" onChange={handleChange} />
                    <label className="terminos-texto">Acepto los <a className="tyc" href="https://docs.google.com/document/d/1_3CCmWctM6PG-UHilKJ_Anc-VPHTWviBG9Y0YDzeTic/edit" target="_blank">términos y condiciones</a></label>
                </div>
                {
                    !terminosValid && <p className="error-form-text">Aceptar términos y condiciones</p>
                }
                <button className="boton-register" type="submit">Enviar</button>
                </form>
            </div>
            <div className="panel-login">
                <p className="mentor-match-title">MENTOR MATCH</p>
                <img src={Img_mentor_match} alt = "Imagen de Login" className="img-login"/>
            </div>
            <div className="inf-mentor-match-r">
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
    )
}

export default Register;