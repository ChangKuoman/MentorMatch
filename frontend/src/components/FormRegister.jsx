import React, { useState, useEffect } from "react";
import "../css/FormRegister.css"
import ErrorTextForm from "./ErrorTextForm";

const FormRegister = () => {
    // variables
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [nroDocumento, setNroDocumento] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('DNI');

    const [confirmClave, setConfirmClave] = useState('');
    const [terminos, setTerminos] = useState(null);
    const [emailValido, setEmailValido] = useState(null);
    const [passwordValido, setPasswordValid] = useState(null);
    const [passwordIgual, setPasswordIgual] = useState(null);
    const [validDocument, setValidDocument] = useState(null);
    const [nombreValido, setValidNombre] = useState(null);

    // input handlers
    const manejarNombre = (e) => {
        setValidNombre(null);
        setNombre(e.target.value);
    };

    const manejarCorreo = (e) => {
        setEmailValido(null);
        setCorreo(e.target.value);
    };

    const manejarClave = (e) => {
        setClave(e.target.value);
    };

    const manejarNroDocumento = (e) => {
        setValidDocument(null);
        setNroDocumento(e.target.value);
    };

    const manejarTerminos = (e) => {
        setTerminos(e.target.checked);
    };

    const manejarDocumentoIdentidad = (e) => {
        setValidDocument(null);
        setTipoDocumento(e.target.value);
    };

    const manejarConfirmClave = (e) => {
        setConfirmClave(e.target.value);
    };

    // useEffects
    useEffect(() => {
        const regexPassword = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/;

        if (!clave) {
            setPasswordValid(null);
        }
        else if (regexPassword.test(clave)) {
            setPasswordValid(true);
        }
        else {
            setPasswordValid(false);
        }
    }, [clave]);

    useEffect(() => {
        if (!confirmClave) {
            setPasswordIgual(null);
        }
        else if (clave === confirmClave) {
            setPasswordIgual(true);
        }
        else {
            setPasswordIgual(false);
        }
    }, [confirmClave]);

    // form handler
    const manejarEnvio = (e) => {
        e.preventDefault();
        
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        (emailPattern.test(correo)) ? setEmailValido(true) : setEmailValido(false);
        
        setValidDocument((tipoDocumento === "DNI" && nroDocumento.length === 8)? true : (tipoDocumento === "CE" && nroDocumento.length === 9) ? true : false);
        
        if (terminos === null) {
            setTerminos(false);
          }
        if (clave === '') {
            setPasswordValid(false);
        }
        if (confirmClave === '') {
            setPasswordIgual(false);
        }
        if (nombre === '') {
            setValidNombre(false);
        } else {
            setValidNombre(true);
        }
        if (emailValido && passwordValido && passwordIgual && terminos && validDocument && nombreValido) {
            console.log("Form enviado");
        }
        
        const url = `https://fjmjpibq48.execute-api.us-east-1.amazonaws.com/test/register`;
        const body = {
            "name" : nombre,
            "email": correo,
            "password": clave,
            "typeDocument": tipoDocumento,
            "nroDocument" : nroDocumento,
        };

        console.log(body);
        const headers = {
            'Content-Type': 'application/json',
        };

        fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status === 200){
                window.location.href = '/';
            } else {
                alert ('El correo no existe');
            }
        })
        .catch(error => {
            // Muestra un mensaje de error
            alert(error);
          });
        
    }

    return (
        <form onSubmit={manejarEnvio}>
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Juan Pérez" onChange={manejarNombre} />
            </div>
            <ErrorTextForm texto="Nombre es requerido" boolean={ nombreValido }/>

            <div>
                <label htmlFor="correo">Correo</label>
                <input type="text" id="correo" placeholder="ejemplo@gmail.com" onChange={manejarCorreo} />
            </div>
            <ErrorTextForm texto="Ingrese un correo válido" boolean={ emailValido }/>

            <div>
                <label htmlFor="contrasena">Contraseña</label>
                <input type="password" id="contrasena" placeholder="*********" onChange={manejarClave} />
            </div>
            <ErrorTextForm texto="La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un dígito" boolean={ passwordValido }/>

            <div>
                <label htmlFor="confirmarContrasena">Confirme su Contraseña</label>
                <input type="password" id="confirmarContrasena" placeholder="*********" onChange={manejarConfirmClave} />
            </div>
            <ErrorTextForm texto="La contraseñas deben coincidir" boolean={ passwordIgual }/>

            <div>
                <label htmlFor="documentoIdentidad">Documento de Identidad</label>
                <div className="contenedor-documentos">
                    <select id="documentoIdentidad" onChange={manejarDocumentoIdentidad}>
                        <option value="DNI">DNI</option>
                        <option value="CE">CE</option>
                    </select>
                    <input type="number" id="dni" placeholder="12345678" onChange={manejarNroDocumento} />
                </div>
            </div>
            <ErrorTextForm texto="El numero de documento debe ser válido" boolean={ validDocument }/>

            <div>
                <input type="checkbox" id="terminos" onChange={manejarTerminos} />
                <label className="terminos-checkbox" htmlFor="terminos">Acepto los <a href="https://www.google.com.pe/" target="_blank">términos y condiciones</a></label>
            </div>
            <ErrorTextForm texto="Aceptar términos y condiciones" boolean={ terminos }/>

            <div onSubmit={manejarEnvio}>
                <input type="submit" value="Registrarme" />
            </div>
        </form>
    );
};

export default FormRegister;