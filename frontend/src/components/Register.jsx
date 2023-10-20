import React from "react";
import { useState, useEffect } from 'react';
import "../css/Register.css"
import url from './url.js';

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
        const documentNroPattern = /^\d+$/
        const passwordValid = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/
        if (!emailPattern.test(email)) {
            setEmailValid(false)
        }
        if (name == '') {
            setNameValid(false)
        }
        if (surname == '') {
            setSurnameValid(false)
        }
        if (!documentNroPattern.test(documentNro) || (documentType === "DNI" && documentNro.length !== 8) || (documentType === "CE" && documentNro.length !== 9)) {
            setDocumentNroValid(false)
        }
        if (terminos == false) {
            setTerminosValid(false)
        }
        if (!passwordValid.test(password)) {
            setPasswordValid(false)
        } else if (password !== confirmPassword) {
            setConfirmPasswordValid(false)
        }

        const today = new Date();
        const bDate = new Date(birthDate);
        const age = today.getFullYear() - bDate.getFullYear();

        if (!(age >= 18 && age < 100)) {
            setBirthDateValid(false)
        }

        if (
            nameValid && surnameValid && emailValid && documentNroValid &&
            passwordValid && confirmPasswordValid && birthDateValid && terminosValid
        ) {
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

    return (
        <div>
            <div className="contenedor-formulario">
            <form className="formulario" onSubmit={handleSubmit}>
            <label className="labels">Correo electrónico</label>
            <input
                className="input-texto-register"
                type="text"
                name="email"
                value={email}
                placeholder="ejemplo@gmail.com"
                onChange={handleChange}
            />
            {
                !emailValid && <p className="error-form-text">Ingrese un correo válido</p>
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
            <input
                className="input-texto-register"
                type="password"
                name="password"
                value={password}
                placeholder="***"
                onChange={handleChange}
            />
            {
                !passwordValid && <p className="error-form-text">La contraseña debe como mínimo 8 caracteres, una mayúscula y un dígito</p>
            }
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
                !birthDateValid && <p className="error-form-text">Debe ser mayor de edad para usar nuestros servicios</p>
            }
            <div className="contenedor-terminos">
                <input type="checkbox" name="terminos" onChange={handleChange} />
                <label className="terminos-texto">Acepto los <a className="tyc" href="https://www.google.com.pe/" target="_blank">términos y condiciones</a></label>
            </div>
            {
                !terminosValid && <p className="error-form-text">Aceptar términos y condiciones</p>
            }
            <button className="boton-register" type="submit">Enviar</button>
            </form>
            </div>
        </div>
    )
}

export default Register;