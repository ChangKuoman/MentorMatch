import React, { useState } from "react";

import BtnWhatsApp from '../icons/icons8-whatsapp-64.png';
import BtnCorreo from '../icons/LogoBlanco-removebg-preview.png'

import '../css/SoporteBtn.css'

const SoporteBtn = () => {
    
    const goMentoMatchWhatsApp = async () => {
        const url = 'https://wa.me/message/UXZOS5GAVXXNA1';
        window.open(url, "_blank");
    }


    return (
        <>
        <div className="soporte-btns-ac">
            <img onClick={goMentoMatchWhatsApp} src={BtnWhatsApp} alt="btn-whatsapp-soporte" />
            <a href="mailto:mentormatch197@gmail.com?Subjet=Consultas"><img src={BtnCorreo} alt="btn-correo-soporte" /></a>
        </div>
        </>
    );
};

export default SoporteBtn;