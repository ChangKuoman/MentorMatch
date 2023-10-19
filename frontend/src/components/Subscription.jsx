import React from "react";
import { useState, useEffect } from 'react';
import "../css/Subscription.css"
import url from './url.js';

const headers = {
  'Content-Type': 'application/json',
};

const Subscription = () => {
    return (
        <div>
            <div className="contenedor">
                <div className="contenedor-intermedio">
                    <div className="contenedor-titulo">
                        <div className="titulo">FREE PLAN</div>
                        <div className="precio">S/. 0</div>
                    </div>
                    <hr className="linea" />
                    <div>
                        <div className="mini-contenedor">
                            <img className="imagen" src="https://static.vecteezy.com/system/resources/previews/017/350/125/original/check-mark-icon-png.png" width={50} height={50}/>
                            <div>Límite de 5 invitaciones por día</div>
                        </div>
                        <div className="mini-contenedor">
                            <img className="imagen" src="https://cdn-icons-png.flaticon.com/512/6372/6372150.png" width={50} height={50}/>
                            <div>Uso de herramientas IA para el apoyo de tu aprendizaje</div>
                        </div>
                        <div className="mini-contenedor">
                            <img className="imagen" src="https://cdn-icons-png.flaticon.com/512/6372/6372150.png" width={50} height={50}/>
                            <div>Mayor acceso a nuestros Star Mentors</div>
                        </div>
                    </div>
                </div>
                <div className="contenedor-intermedio">
                    <div className="contenedor-titulo">
                        <div className="titulo">PREMIUM PLAN</div>
                        <div className="precio">S/. 10</div>
                    </div>
                    <hr className="linea" />
                    <div>
                        <div className="mini-contenedor">
                            <img className="imagen" src="https://static.vecteezy.com/system/resources/previews/017/350/125/original/check-mark-icon-png.png" width={50} height={50}/>
                            <div>Invitaciones ilimitadas por día</div>
                        </div>
                        <div className="mini-contenedor">
                            <img className="imagen" src="https://static.vecteezy.com/system/resources/previews/017/350/125/original/check-mark-icon-png.png" width={50} height={50}/>
                            <div>Uso de herramientas IA para el apoyo de tu aprendizaje</div>
                        </div>
                        <div className="mini-contenedor">
                            <img className="imagen" src="https://static.vecteezy.com/system/resources/previews/017/350/125/original/check-mark-icon-png.png" width={50} height={50}/>
                            <div>Mayor acceso a nuestros Star Mentors</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription;