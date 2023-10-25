import React from "react";
import { useState, useEffect } from 'react';
import "../css/Chat.css"
import url from './url.js';

import LogoEnviar from '../icons/enviar.png'

const headers = {
  'Content-Type': 'application/json',
};

const Chat = () => {

    const [chats, setChats] = useState([])

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
        }, []);

    const [renderChat, setRenderChat] = useState([])

    function handleBotonChat(chat) {
      setRenderChat([chat])
    }

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

      fetch(url + '/put-chat', {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            'chat': renderChat[0].uuid,
            'message': inputMsg,
            'user': email
          }),
        }).then(response => response.json())
          .then(data=> {
              console.log(data)
              if (data.status === 200) {
                setInputMsg("")
                renderChat[0] = data.chats[0]

                const index = chats.findIndex((chat) => chat.uuid === data.chats[0].uuid);
                if (index !== -1) {
                  chats[index].messages = data.chats[0].messages;
                }
                console.log(chats)
              }
          })
          .catch(error => {
          });

    }

    const handleMsg = (event) => {
      setInputMsg(event.target.value);
    }

    return (
        <div>
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
                    <div className="contenedor-mensajes">
                      {chat.messages.map((message) => (
                        <div key={message.uuid}>
                          <div className={lugarMensaje(chat, message)}>
                            <div className="usuario">{message.user}</div>
                            <div className="contenido">{message.content}</div>
                            <div className="fecha">{message.date}</div>
                          </div>
                        </div>
                      ))}
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