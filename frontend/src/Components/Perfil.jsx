import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import './Styles/Perfil.css';

function Perfil() {
    const [nombre, setNombre] =useState('');
    const [apellido, setApellido] =useState('');
    const [genero, setGenero] =useState('');
    const [contraseña, setContraseña] =useState('');
    const [fechaNacimiento, setFechaNacimiento] =useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    const usuarioCookie = cookies.usuario;
    const persona = usuarioCookie ? usuarioCookie.correo : 'Anónimo';
    const nombreP = usuarioCookie ? usuarioCookie.nombre : 'Anónimo';

    useEffect(() => {
        if (usuarioCookie) {
            setNombre(usuarioCookie.nombre);
            setApellido(usuarioCookie.apellido);
            setGenero(usuarioCookie.genero);
            setFechaNacimiento(usuarioCookie.fechaNacimiento);
            setContraseña(usuarioCookie.contraseña)
        }
    }, [usuarioCookie]); // Se ejecuta cada vez que cambia la cookie 'usuario'

    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login');
    };

    const actualizarDatos = (event) => {
        event.preventDefault();
        const data = {
            nombre: nombre,
            apellido: apellido,
            genero: genero,
            contraseña: contraseña,
            fechaNacimiento: fechaNacimiento,
        }
        if (nombre === "" || apellido === "" || genero === "" || contraseña === "" || fechaNacimiento === "") {
            alert(`Haz dejado un campo en blanco.`)
        } else {
            fetch(`http://localhost:5000/usuarios/${persona}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    alert(res.response)
                    setCookie('usuario', dataUser);
    
                    setNombre("")
                    setApellido("")
                    setContraseña("")
                    setGenero("")
                    setFechaNacimiento("")
                })
                .catch((error) => console.error(error));
        }

    }
    return (
        <>
            <header>
                <nav>
                    <div className='contIcono'>
                        <img src="/src/Components/Imagenes/Popcornflix.png" alt="PopCornFlix" />
                    </div>
                    <div className='menu'>
                        <ul className='submenu'>
                            <li className='casilla'><a href="/user" className='link'>Catalogo<figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="/user/alquilada" className='link'>Alquilada<figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="/user/devolverAlquilada" className='link'>Devolver pelicula<figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="/user/historial" className='link'>Historial<figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="/user/perfil" className='link'>Perfil<figure className='figura'></figure></a></li>
                            <li className='casilla'><button className="btn btn-danger" id='btn' onClick={handleLogout}>Cerrar sesión</button></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <section className='section_'>
                <div className='datosPerfil'>
                <h1>Perfil de: {persona}</h1>
                <div className='datosPerfil_'>
                    <form onSubmit={actualizarDatos} className='form-signin w-100 m-auto'>
                                <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder=""
                                            onChange={(e) => setNombre(e.target.value)}
                                            value={nombre}
                                        />
                                        <label htmlFor="floatingInput">Nombre</label>
                                    </div>

                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder=""
                                            onChange={(e) => setApellido(e.target.value)}
                                            value={apellido}
                                        />
                                        <label htmlFor="floatingInput">Apellido</label>
                                    </div>

                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <select type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder=""
                                            onChange={(e) => setGenero(e.target.value)}
                                            value={genero}>
                                            <option value="opcion1">M</option>
                                            <option value="opcion2">F</option>
                                        </select>
                                        <label htmlFor="floatingInput">Genero</label>
                                    </div>

                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder=""
                                            onChange={(e) => setFechaNacimiento(e.target.value)}
                                            value={fechaNacimiento}
                                        />
                                        <label htmlFor="floatingInput">Fecha de Nacimiento</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Contraseña"
                                            onChange={(e) => setContraseña(e.target.value)}
                                            value={contraseña}
                                        />
                                        <label htmlFor="floatingPassword">Contraseña</label>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-outline-primary btn-lg">Editar</button>
                                    </div>
                                </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Perfil