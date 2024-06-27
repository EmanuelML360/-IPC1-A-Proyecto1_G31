import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import './Styles/Usuarios.css';

function Usuarios() {

    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    const usuarioCookie = cookies.usuario;
    const [usuarios, setUsuarios] = useState([]);

    const handleLogout = () => {
        navigate('/login');
        removeCookie('usuario');
    };

    useEffect(() => {
        fetch(`http://localhost:5000/usuarios`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                setUsuarios(res);
            })
            .catch((error) => console.error(error));
    }, []);

    const eliminar = (index) => {
        fetch(`http://localhost:5000/usuarios/${usuarios[index].correo}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((res) => {
            alert(res.response)
            window.location.reload();
        })
        .catch((error) => console.error(error));
    };

    return (
        <>
            <header>
                <nav>
                    <div className='contIcono'>
                        <img src="/src/Components/Imagenes/Popcornflix.png" alt="PopCornFlix" />
                    </div>
                    <div className='menu_'>
                        <ul className='submenu'>
                            <li className='casilla'><a href="/admin" className='link'>Inicio<figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="/admin/ingresarPeliculas" className='link'>Ingresar peliculas <figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="/admin/contenido" className='link'>Contenido<figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="/admin/usuarios" className='link'>Usuarios<figure className='figura'></figure></a></li>
                            <li className='casilla'><button class="btn btn-danger" id='btn' onClick={handleLogout}>Cerrar seción</button></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <section className='seccion'>
                <h1>Usuarios registrados:</h1>
                <table>
                    <tr>
                        <td>Nombre</td>
                        <td>Apellido</td>
                        <td>Correo electronico</td>
                        <td>Genero</td>
                        <td>fecha nacimiento</td>
                        <td>Eliminar</td>
                    </tr>
                </table>
                {usuarios.map((item, index) => (
                    item.role !== "0" && (
                        <div className='usuario' key={index}>
                            <table>
                                <tr>
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.correo}</td>
                                    <td>{item.genero}</td>
                                    <td>{item.fechaNacimiento}</td>
                                    <td><button type="button" className="btn btn-outline-dark" onClick={() => eliminar(index)}>Eliminar</button></td>
                                </tr>
                            </table>
                        </div>
                    )
                ))}
            </section>
        </>
    );
};

export default Usuarios