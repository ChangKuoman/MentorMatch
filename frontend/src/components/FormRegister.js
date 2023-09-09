import React, { useState } from "react";
import "../css/FormRegister.css"

function FormRegister() {

    const manejarEnvio = e => {
        e.preventDefault();
        console.log(
            nombre,
            clave,
            confirmClave,
            dni,
            nombre,
            correo,
            terminos
        );
    }

    const [nombre, setNombre] = useState('');

    const manejarNombre = e => {
        setNombre(e.target.value);
    }

    const [correo, setCorreo] = useState('');

    const manejarCorreo = e => {
        setCorreo(e.target.value);
    }

    const [clave, setClave] = useState('');

    const manejarClave = e => {
        setClave(e.target.value);
    }

    const [confirmClave, setConfirmClave] = useState('');

    const manejarConfirmClave = e => {
        setConfirmClave(e.target.value);
    }

    const [dni, setDNI] = useState('');

    const manejarDNI = e => {
        setDNI(e.target.value);
    }

    const [terminos, setTerminos] = useState('');

    const manejarTerminos = e => {
        setTerminos(e.target.checked);
    }

    return (
        <form onSubmit={manejarEnvio}>
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Juan Pérez" onChange={manejarNombre} />
            </div>
            <div>
                <label htmlFor="correo">Correo</label>
                <input type="text" id="correo" placeholder="ejemplo@gmail.com" onChange={manejarCorreo} />
            </div>
            <div>
                <label htmlFor="contrasena">Contraseña</label>
                <input type="password" id="contrasena" placeholder="*********" onChange={manejarClave} />
            </div>
            <div>
                <label htmlFor="confirmarContrasena">Confirme su Contraseña</label>
                <input type="password" id="confirmarContrasena" placeholder="*********" onChange={manejarConfirmClave} />
            </div>
            <div>
                <label htmlFor="dni">DNI</label>
                <input type="number" id="dni" placeholder="12345678" onChange={manejarDNI} />
            </div>
            <div>
                <input type="checkbox" id="terminos" onChange={manejarTerminos} />
                <label className="terminos-checkbox" htmlFor="terminos">Acepto los <a href="https://www.google.com.pe/" target="_blank">términos y condiciones</a></label>
            </div>
            <div>
                <input type="submit" value="Registrarme" />
            </div>
        </form>
    );
}

export default FormRegister;