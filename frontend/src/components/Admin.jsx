import React from 'react';
import { useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { url } from './utils.js'

function Admin() {
    const [csvData, setCsvData] = useState([]);
    const [filename, setFilename] = useState('my-file.csv');

    function descargarDesdeDynamoDB(endpoint) {
        const lambdaURL = url + '/csv/' + endpoint;

        fetch(lambdaURL)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setCsvData(data);
            setFilename(endpoint + '.csv')
          })
    }

    return (
      <div>
        <button onClick={() => descargarDesdeDynamoDB('register')}>Fecha Creación Usuarios</button>
        <button onClick={() => descargarDesdeDynamoDB('event')}>Fecha Creación Eventos</button>
        <button onClick={() => descargarDesdeDynamoDB('qualification')}>Calificaciones Mentor Match</button>
        <button onClick={() => descargarDesdeDynamoDB('login')}>Login Usuarios</button>
        <button onClick={() => descargarDesdeDynamoDB('state')}>Cambio de Estado</button>
          <CSVLink
            data={csvData}
            enclosingCharacter={`'`}
            filename={filename}
          >Download me</CSVLink>
      </div>
    );
}

export default Admin;
