import React from 'react';
import { useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { url } from './utils.js'
import "../css/Admin.css"

function Admin() {
    const [csvData, setCsvData] = useState([]);
    const [filename, setFilename] = useState('my-file.csv');
    const [show, setShow] = useState(false);

    function descargarDesdeDynamoDB(endpoint) {
        const lambdaURL = url + '/csv/' + endpoint;

        fetch(lambdaURL)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setCsvData(data);
            setFilename(endpoint + '.csv')
            setShow(true);
          })
    }

    return (
      <div>
        <div className='contenedor-boton-descarga'>
          <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('register')}>Fecha Creación Usuarios</button>
          <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('event')}>Fecha Creación Eventos</button>
          <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('qualification')}>Calificaciones Mentor Match</button>
          <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('login')}>Login Usuarios</button>
          <button className="boton-descarga" onClick={() => descargarDesdeDynamoDB('state')}>Cambio de Estado</button>
        </div>
        {
          show && <div className='contenedor-boton-descarga-15'>
          <CSVLink
              onClick={() => setShow(false)}
              className='boton-descarga-15'
              data={csvData}
              enclosingCharacter={`"`}
              filename={filename}
              separator={"%%%"}
            >Descargar .cvs</CSVLink>
          </div>
        }
      </div>
    );
}

export default Admin;
