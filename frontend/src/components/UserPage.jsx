import React, {useState, useEffect} from "react";
import BotonBack from '../icons/deshacer 1boton-back.png';
import BotonHome from '../icons/boton-home.png';
import url from './url.js';
import '../css/UserPage.css'
import Rating from '@mui/material/Rating';

import PencilLogo from '../icons/pencil.png'
import XLogo from '../icons/equis-2.png'

import listaCursos from "./cursos.js";

import PFP1 from '../icons/1-huevo.png'
import PFP2 from '../icons/2-cascaron.png'
import PFP3 from '../icons/3-pollo.png'
import PFP4 from '../icons/4-pato.png'
import PFP5 from '../icons/5-ganso.png'

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
    const [tagsDeshabilitadas, setTagsDeshabilitadas] = useState(listaCursos)


    const [descripcion, setDescripcion] = useState("")
    const [modalDescripcion, setModalDescripcion] = useState(false)
    const [modalTags, setModalTags] = useState(false)
    const [modalPFP, setModalPFP] = useState(false)
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
    const abrirModalP = () => {
        setModalPFP(true)
    }
    const cerrarModalP = () => {
        setSelectedFile(null)
        setImageData('')
        setModalPFP(false)
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

    function hallarImagen(user) {
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

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageData, setImageData] = useState('');

    const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (file && file.size > 15000) {
        alert('Por favor, selecciona un archivo menor a 15 KB');
        return;
      }
      setSelectedFile(file);
    };

    function cambiarImagen() {
        if (!selectedFile) {
            return;
        }
        const reader = new FileReader();

        reader.onloadend = function () {
            const base64String = reader.result.split(',')[1];
            setImageData(base64String);

            const user = JSON.parse(localStorage.getItem('user'));
            const email = user.email;

            fetch(url + '/user-pfp', {
                method: 'PUT',
                headers,
                body: JSON.stringify({
                'email': email,
                'profile_picture': base64String
                }),
            }).then(response => response.json())
                .then(data=> {
                    console.log(data)
                    if (data.status === 200) {
                        setUsuario(data.users)
                        cerrarModalP()
                    }
                })
                .catch(error => {
                });
        };
        reader.readAsDataURL(selectedFile);


    }

    function isValidPhotoChange(user) {
        if (!user.verified) {
            return false;
        }
        if (setQualification(user.qualification) < 4) {
            return false;
        }
        return true;
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
                <div>
                    <img className={user.verified ? "imagen-pfp dorado" : "imagen-pfp"} src={hallarImagen(user)} />
                    {
                        isValidPhotoChange(user) && <img onClick={abrirModalP} className="imagen-lapiz lapiz-foto" src={PencilLogo} width={20} height={20}/>
                    }
                </div>

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
                    <p>Descripción <img onClick={abrirModalD} className="imagen-lapiz" src={PencilLogo} width={20} height={20}/></p>
                    <section className="info2">{user.description}</section>
                </div>
                <div className="data">
                    <p>Calificación</p>
                    <Rating defaultValue={setQualification(user.qualification)} precision={0.5} readOnly />
                </div>
                <div className="data">
                    <p>Tags <img onClick={abrirModalT} className="imagen-lapiz" src={PencilLogo} width={20} height={20}/></p>
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
                        <img className="cerrar-modal" onClick={cerrarModalD} src={XLogo} width={20} height={20} />
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
                        <img onClick={cerrarModalT} src={XLogo} width={20} height={20} />
                        <div className="modal-derecha">
                            <div className="contenedor-derecha-tags">
                                <div className="cuadro-tags">
                                    <div className="texto-tags">Habilitado</div>
                                    {
                                        <div className="contenedor-tags control-overflow">
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
                                        <div className="contenedor-tags control-overflow">
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
            {
                modalPFP && <div className="overlay">
                    <div className="content-modal">
                        <img className="cerrar-modal" onClick={cerrarModalP} src={XLogo} width={20} height={20} />
                        <div className="modal-derecha">
                            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                            <div className="contenedor-vacio">
                            <div className="vacio"/>
                            {selectedFile && (
                                <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
                            )}
                            </div>
                            <button className="boton-modal-descripcion" onClick={cambiarImagen}>Guardar</button>
                        </div>
                   </div>
                </div>

            }
        </div>
    )
};

export default UserPage;