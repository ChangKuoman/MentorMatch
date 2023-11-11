import React from 'react';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">
        <div className="footer-section-1">
          <div className="footer-section">
            <h2>Objetivo de la app</h2>
            <p>Nuestra aplicación tiene como objetivo conectar mentores y mentees de una manera fácil y efectiva.</p>
          </div>
        </div>
        <div className="footer-section-2">
          <div className="footer-section">
            <h2>Quiénes somos</h2>
              <p>
              Somos un equipo de desarrolladores que cree en el poder de la mentoría. Queremos ayudar a las personas a aprender y crecer, y creemos que nuestros servicios pueden hacer una diferencia en el mundo.
              </p>
          </div>
        </div>
        <div className="footer-section-3">
          <div className="footer-section">
            <h2>Soporte técnico</h2>
            <p>
                    Si tienes alguna pregunta o problema, no dudes en contactarnos a soporteMentorMatch@gmail.com
                </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
