import React from "react";
import { useState, useEffect, useRef, useCallback } from 'react';
import "../css/Chat.css"

import Logo from "./Logo";
import LogoUser from '../icons/icons8-user-64.png';
import LogoLogOut from '../icons/icons8-logout-100.png';
import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';

import LogoEnviar from '../icons/enviar.png'

import { url, headers } from './utils.js'

const getLogOutPosition = () => {
  const logOutElement = document.querySelector(".LogoLogOut");
  if (!logOutElement) {
    return {
      x: 0,
      y: 0,
    };
  }

  const logOutRect = logOutElement.getBoundingClientRect();
  const logOutX = logOutRect.left;
  const logOutY = logOutRect.top;
  const logOutHeight = logOutRect.height;
  const logOutWidth = logOutRect.width;
  return {
    x: logOutX - 50 + logOutWidth/2,
    y: logOutY + logOutHeight,
  };
};

const Chat = () => {

    const [chats, setChats] = useState([])
    const [connection, setConnection] = useState(null);

    const updateChats = useCallback((dataChats) => {
      setChats(prevChats => {
        return prevChats.map(chat => {
          if (chat.uuid === dataChats[0].uuid) {
            return { ...chat, messages: dataChats[0].messages };
          }
          return chat;
        });
      });
    }, []);


    useEffect(() => {
        async function fetchData() {
            const user = JSON.parse(localStorage.getItem('user'));
            const email = user.email;

            fetch(url + "/get-users", {
                method: 'POST',
                headers,
                body: JSON.stringify({
                  'emails': [email]
                }),
              }).then(response => response.json())
                .then(data=> {
                  if (data.status === 200){
                    // FETCH 1
                    fetch(url + "/get-chats", {
                      method: 'POST',
                      headers,
                      body: JSON.stringify({
                        'chats': data.users[0].chats
                      }),
                    }).then(response2 => response2.json())
                      .then(data2 => {
                        if (data2.status === 200){
                          setChats(data2.chats)
                        }
                      })
                      .catch(error => {
                      });

                } else {
                  }
                })
                .catch(error => {
                });
        }

        fetchData();

        const socket = new WebSocket('wss://ohkhi5gvc3.execute-api.us-east-1.amazonaws.com/test/');

        socket.onopen = () => {
          console.log('Conexión establecida.');
          setConnection(socket)
          const user = JSON.parse(localStorage.getItem('user'));
          const email = user.email;
          socket.send(JSON.stringify({
            "action": "setEmail",
            "email": email,
          }))
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if (data.status === 200 && data.action === "sendMessage") {
            setInputMsg("")

            // this renders the chat either way you send o receive a message
            setRenderChat(data.chats)

            // this updates the chat in the chats array
            updateChats(data.chats);

            // check if last message is from user's email
            const user = JSON.parse(localStorage.getItem('user'));
            const email = user.email;
            const lastMessage = data.chats[0].messages[data.chats[0].messages.length - 1];
            if (lastMessage.user !== email) {
              alert("Un nuevo mensaje acaba de llegar.");
            }
          }
          else if (data.status === 429 && data.action === "sendMessage") {
            alert("Ha alcanzado el límite de mensajes por día. Intente mañana.")
          }
        };

        socket.onclose = () => {
          console.log('Conexión cerrada.');
        };

        return () => {
          socket.close();
          setConnection(null);
        };
      }, []);

    const [renderChat, setRenderChat] = useState([])

    function handleBotonChat(chat) {
      setRenderChat([chat])
      setInputMsg("")
    }

    useEffect(() => {
      scrollToBottom()
      // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
    }
    , [renderChat]);

    function getEmail(chat) {
        const splitEmails = chat.emails.split('/');
        const user = JSON.parse(localStorage.getItem('user'));
        const myEmail = user.email;
        const theEmail = splitEmails.find((email) => email !== myEmail);

        return theEmail;
    }

    function getButtonEmail(chat) {
      return (
        <button className="boton-chat" onClick={() => handleBotonChat(chat)}>{getEmail(chat)}</button>
      )
    }

    function lugarMensaje(chat, message) {
      if (message.user === "system") {
        return "contenedor-mensaje left";
      }
      else if (message.user === getEmail(chat)) {
        return "contenedor-mensaje left";
      }
      else {
        return "contenedor-mensaje right";
      }
    }

    const [inputMsg, setInputMsg] = useState("")

    function enviarMsg() {
      if (renderChat.length === 0) {
        alert("Seleccione un chat para enviar un mensaje.")
        return;
      }
      if (!inputMsg) {
        alert("Ingrese texto para enviar un mensaje.")
        return;
      }

      const user = JSON.parse(localStorage.getItem('user'));
      const email = user.email;

      if (connection) {
        connection.send(JSON.stringify({
          "action":"sendMessage",
          "message":inputMsg,
          "to":getEmail(renderChat[0]),
          "fr":email,
          "uuid": renderChat[0].uuid
        }));
      }

    }

    const handleMsg = (event) => {
      setInputMsg(event.target.value);
    }

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView(
        // { behavior: "smooth" }
      )
    }

    const [isVisible, setIsVisible] = useState(false);
    const handleMouseEnter = () => {
        setIsVisible(true);
    };
    const handleMouseLeave = () => {
        setIsVisible(false);
    };
    const handleHomeClick = () => {
        window.location.href = '/home';
    }

    const handleBackClick  = () => {
        window.location.href = '/home';
    }

    const [IsOpen, setIsOpen] = useState(false);
    const [logOutPosition, setLogOutPosition] = useState(getLogOutPosition());
    const OpenModal = () => {
        setIsOpen(!IsOpen);
        setLogOutPosition(getLogOutPosition());
    }

    const handleLogout = () => {
        // Limpia los datos de la sesión del localstorage
        localStorage.removeItem('user');
        localStorage.removeItem('isLog');

        // Redirige al usuario a /login
        window.location.href = '/';
    };

    const accessUser = () => {
        window.location.href = '/user/';
    };


    return (
        <div>
          <div className="HeaderHome">
            <Logo className = 'Logo'/>
              <h1>MentorMatch</h1>
              <div className="botones-nav">
                  <img src = {LogoUser}
                      alt="logo user"
                      className="LogoLogOut"
                      onClick={accessUser}
                  />
                  <img src = {LogoLogOut}
                      alt = "logo Log Out"
                      className="LogoLogOut"
                      onClick={OpenModal}
                  />
                  {
                  IsOpen &&
                  <div className="modal" style={{left: logOutPosition.x, top:logOutPosition.y}}>

                      <div className="modal-content">
                          <button className="close-modal" onClick={OpenModal}>Cancelar</button>
                          <button onClick={handleLogout}>Cerrar Sesion</button>
                      </div>
                  </div>
                  }
              </div>
          </div>
          <div className="frame1">
          </div>
          <div className="frame2"></div>
          <div onMouseEnter={handleMouseEnter} className="Open-nave"></div>
          <div className={`nav${isVisible ? '' : 'hidden'}`}>
              <img src = {BotonBack} alt = "Boton de regreso" className="boton-regreso" onClick={handleBackClick}/>
              <img src = {BotonHome} alt = "Boton de home" className="boton-home" onClick={handleHomeClick}/>
          </div>
          <div className="contenedor-mas-grande-chat">
            <div className="contenedor-grande-chat">

              <div className="contenedor-izq-chat">
                <div className="texto-chats-chat">CHATS</div>
                <div className="contenedor-emails-chat">
                  {chats.map((chat) => (
                    <div key = {chat.uuid}>
                        {getButtonEmail(chat)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="contenedor-der-chat">
                <div className="contenedor-vacio-chat">
                <div className="vacio-chat" />

                {renderChat.map((chat) => (
                  <div key={chat.uuid} className="contenedor-email-mensajes">
                    <div className="email-seleccionado">{getEmail(chat)}</div>
                    <div className="contenedor-mensajes" >
                      {chat.messages.map((message) => (
                        <div key={message.uuid}>
                          <div className={lugarMensaje(chat, message)}>
                            <div className="usuario">{message.user}</div>
                            <div className="contenido">{message.content}</div>
                            <div className="fecha">{message.date}</div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                ))}
                </div>
                <div className="contenedor-enviar">
                  <input value={inputMsg} onChange={handleMsg} className="input-texto-chat" type="text" />
                  <img onClick={enviarMsg} src={LogoEnviar} height={25} width={25}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Chat;