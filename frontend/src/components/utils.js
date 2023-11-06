// IMPORTS
import PFP1 from '../icons/1-huevo.png'
import PFP2 from '../icons/2-cascaron.png'
import PFP3 from '../icons/3-pollo.png'
import PFP4 from '../icons/4-pato.png'
import PFP5 from '../icons/5-ganso.png'

// CONSTANTS

export const headers = {
    'Content-Type': 'application/json',
};
export const url = "https://fnac3oh84b.execute-api.us-east-1.amazonaws.com/prod";
export const listaCursos = [
    "Cálculo de una variable", "Química General", "Programación 1",
    "Cálculo vectorial", "Ciencia de los materiales", "Introducción a la mecánica",
    "Estadística y probabilidades", "Ecuaciones diferenciales", "Álgebra lineal",
    "Programación 2", "Métodos numéricos", "Fundamentos de electricidad y magnetismo",
    "Termodinámica", "Estadística Aplicada", "Investigación de Operaciones 1",
    "Investigación de Operaciones 2", "Planificación y Control de Operaciones",
    "Desarrollo Basado en Plataformas", "Base de Datos 1", "Matemáticas Discretas 1",
    "Programación 3", "Circuitos Analógicos", "Circuitos Digitales",
    "Introducción a Sistemas Embebidos", "Modelado y Simulación"
]

// FUNCTIONS

export function setQualification(q) {
    const cant = q[0];
    const sum = q[1];
    if (cant == 0){ return 0; }
    else {
        return sum / cant;
    }
}

export function calcularEdad(fechaNacimiento) {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener el año, mes y día de la fecha de nacimiento
    const añoNacimiento = fechaNacimiento.split("/")[0];
    const mesNacimiento = fechaNacimiento.split("/")[1];
    const diaNacimiento = fechaNacimiento.split("/")[2];

    // Obtener el año, mes y día de la fecha actual
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;
    const diaActual = fechaActual.getDate();

    // Calcular la edad
    let edad = añoActual - añoNacimiento;
    if (mesActual < mesNacimiento) {
        edad--;
    } else if (mesActual === mesNacimiento && diaActual < diaNacimiento) {
        edad--;
    }

    return edad;
}

export function hallarImagen(user) {
    if (user.photo) {
        return `data:image/jpeg;base64,${user.photo}`
    }
    const q = setQualification(user.qualification);
    const cant = user.qualification[0];
    if (q >= 4 && cant >= 30) {
        return PFP5;
    } else if (q >= 3 && cant >= 20) {
        return PFP4;
    } else if (q >= 2 && cant >= 15) {
        return PFP3;
    } else if (q >= 1 && cant >= 10) {
        return PFP2;
    } else {
        return PFP1;
    }
}