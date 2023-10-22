import React, {useState, useEffect} from "react";
import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';
import url from './url.js';
import '../css/UserPage.css'
import Rating from '@mui/material/Rating';

const headers = {
    'Content-Type': 'application/json',
};

function setQualification(q) {
    const cant = q[0];
    const sum = q[1];
    if (cant == 0){ return 0; }
    else {
        return sum / cant;
    }
  }

const UserPage = () => {
    const [tagsHabilitadas, setTagsHabilitadas] = useState([])
    const [tagsDeshabilitadas, setTagsDeshabilitadas] = useState(['Python', 'C++', 'Java', 'Rust', 'JavaScript', 'Dart', 'HTML', 'CSS', 'Vuejs', 'React', 'Swift'])


    const [descripcion, setDescripcion] = useState("")
    const [modalDescripcion, setModalDescripcion] = useState(false)
    const [modalTags, setModalTags] = useState(false)
    // Define un estado para controlar la visibilidad del nav
    const [isVisible, setIsVisible] = useState(false);

    const abrirModalD = () => {
        setModalDescripcion(true)
    }
    const cerrarModalD = () => {
        setModalDescripcion(false)
    }
    const abrirModalT = () => {
        setModalTags(true)
    }
    const cerrarModalT = () => {
        setModalTags(false)
    }

    const manejarCambioDescripcion = (e) => {
        setDescripcion(e.target.value)
    }
    const cambiarDescripcion = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const email = user.email;

        fetch(url + '/user-description', {
            method: 'PUT',
            headers,
            body: JSON.stringify({
              'email': email,
              'description': descripcion
            }),
          }).then(response => response.json())
            .then(data=> {
                console.log(data)
                if (data.status === 200) {
                    setUsuario(data.users)
                    cerrarModalD()
                }
            })
            .catch(error => {
            });
    }
    // Manejador del evento `onMouseEnter` del elemento `.frame2`
    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleHomeClick = () => {
        window.location.href = '/home';
    }

    const handleBackClick  = () => {
        window.location.href = '/home';
    }

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    const [usuario, setUsuario] = useState([])

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
                    setUsuario(data.users)
                    setDescripcion(data.users[0].description)

                    setTagsHabilitadas(data.users[0].tags);
                    const nuevosDeshabilitados = tagsDeshabilitadas.filter(tag => !data.users[0].tags.includes(tag));
                    setTagsDeshabilitadas(nuevosDeshabilitados);
                } else {
                  }
                })
                .catch(error => {
                });
        }
        fetchData();
    }, [])

    function deshabilitarTag(tag) {
        setTagsHabilitadas(tagsHabilitadas.filter((t) => t !== tag));
        setTagsDeshabilitadas([...tagsDeshabilitadas, tag]);
    }
    function habilitarTag(tag) {
        setTagsDeshabilitadas(tagsDeshabilitadas.filter((t) => t !== tag));
        setTagsHabilitadas([...tagsHabilitadas, tag]);
    }
    const cambiarTags = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const email = user.email;

        fetch(url + '/user-tags', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              'email': email,
              'tags': tagsHabilitadas
            }),
          }).then(response => response.json())
            .then(data=> {
                if (data.status === 200) {
                    cerrarModalT()
                }
            })
            .catch(error => {
            });
        fetch(url + '/user-tags', {
            method: 'DELETE',
            headers,
            body: JSON.stringify({
                'email': email,
                'tags': tagsDeshabilitadas
            }),
            }).then(response => response.json())
            .then(data=> {
                if (data.status === 200) {
                    cerrarModalT()
                }
            })
            .catch(error => {
            });
        usuario[0].tags = tagsHabilitadas
    }
    return (
        <div className="UserPage" onMouseLeave={handleMouseLeave}>
            <div className="frame1">
                <p>MENTOR MATCH</p>
            </div>
            <div className="frame2"></div>
            <div onMouseEnter={handleMouseEnter} className="Open-nave"></div>
            <div className={`nav${isVisible ? '' : 'hidden'}`}>
                <img src = {BotonBack} alt = "Boton de regreso" className="boton-regreso" onClick={handleBackClick}/>
                <img src = {BotonHome} alt = "Boton de home" className="boton-home" onClick={handleHomeClick}/>
            </div>
            {usuario.map((user)=>(
            <div className="user-content" key={user.email}>
                <div className="data">
                    <p>Nombre</p>
                    <section className="info">{user.name}</section>
                </div>
                <div className="data">
                    <p>Apellido</p>
                    <section className="info">{user.surname}</section>
                </div>
                <div className="data">
                    <p>Correo</p>
                    <section className="info">{user.email}</section>
                </div>
                <div className="data">
                    <p>Fecha de Nacimiento</p>
                    <section className="info">{user.birthDate}</section>
                </div>
                <div className="data">
                    <p>Descripción <img onClick={abrirModalD} className="imagen-lapiz" src="https://cdn-icons-png.flaticon.com/512/2919/2919564.png" width={20} height={20}/></p>
                    <section className="info2">{user.description}</section>
                </div>
                <div className="data">
                    <p>Calificación</p>
                    <Rating defaultValue={setQualification(user.qualification)} precision={0.5} readOnly />
                </div>
                <div className="data">
                    <p>Tags <img onClick={abrirModalT} className="imagen-lapiz" src="https://cdn-icons-png.flaticon.com/512/2919/2919564.png" width={20} height={20}/></p>
                    <div className="contenedor-tags">
                        {user.tags.map((tag) => (
                            <div key= {tag} className="tag">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            ))}
            {
                modalDescripcion && <div className="overlay">
                    <div className="content-modal">
                        <img className="cerrar-modal" onClick={cerrarModalD} src="https://cdn-icons-png.flaticon.com/512/7560/7560626.png" width={20} height={20} />
                        <div className="modal-derecha">
                            <textarea className="textarea-modal-descripcion" onChange={manejarCambioDescripcion} value={descripcion}></textarea>
                            <button className="boton-modal-descripcion" onClick={cambiarDescripcion}>Guardar</button>
                        </div>
                   </div>
                </div>

            }
            {
                modalTags && <div className="overlay">
                    <div className="content-modal alto">
                        <img onClick={cerrarModalT} src="https://cdn-icons-png.flaticon.com/512/7560/7560626.png" width={20} height={20} />
                        <div className="modal-derecha">
                            <div className="contenedor-derecha-tags">
                                <div className="cuadro-tags">
                                    <div className="texto-tags">Habilitado</div>
                                    {
                                        <div className="contenedor-tags">
                                            {tagsHabilitadas.map((tag) => (
                                                <div key= {tag} className="tag" onClick={() => deshabilitarTag(tag)}>
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                                <div className="cuadro-tags">
                                    <div className="texto-tags">Desabilitado</div>
                                    {
                                        <div className="contenedor-tags">
                                            {tagsDeshabilitadas.map((tag) => (
                                                <div key= {tag} className="tag" onClick={() => habilitarTag(tag)}>
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                            <button className="boton-modal-descripcion" onClick={cambiarTags}>GUARDAR</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default UserPage;