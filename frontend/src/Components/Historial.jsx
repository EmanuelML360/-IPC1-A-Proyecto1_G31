import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import './Styles/Historial.css';

function Historial() {

    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    const usuarioCookie = cookies.usuario;
    const persona = usuarioCookie ? usuarioCookie.correo : 'Anónimo';
    const nombreP = usuarioCookie ? usuarioCookie.nombre : 'Anónimo';
    const [historial, setHistorial] = useState([]);
    const estado = "Devuelta"

    useEffect(() => {
        fetch(`http://localhost:5000/historial`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                const peliculasRentadas = res.reverse();
                const historial_Usuario = peliculasRentadas.filter(pelicula => pelicula.persona === persona)
                if (historial_Usuario.some(pelicula => pelicula.estado === estado)) {
                    historial_Usuario.forEach(pelicula => {
                        if (pelicula.estado === estado) {
                            pelicula.mora = 0;
                        } else if (pelicula.estado === "En alquiler") {
                            pelicula.mora = 0;
                        }
                    });
                }

                setHistorial(historial_Usuario);
            })
            .catch((error) => console.error(error));

        fetch(`http://localhost:5000/historial/retraso`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                const retraso = res.response
            })
            .catch((error) => console.error(error));
    }, []);

    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login');
    };

    return (
        <>
            <header>
                <nav>
                    <div className='contIcono'>
                        <img src="/src/Components/Imagenes/Popcornflix.png" alt="PopCornFlix" />
                    </div>
                    <div id='menu'>
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
            <section className='sectionhis'>
                <h1 className='tituloHistorial'>Historial de: {persona}</h1>
                <div className='peliculasRentadas'>
                    <table className='table'>
                        <tr>
                            <td>Titulo</td>
                            <td>Fecha inicio renta</td>
                            <td>Fecha fin renta</td>
                            <td>Fecha entregada</td>
                            <td>Estado de renta</td>
                            <td>Dias retraso</td>
                            <td>Mora</td>
                            <td>Costo</td>
                            <td>Total</td>
                        </tr>
                    </table>
                    {historial.map((item, index) => (
                        <div className='peliculaRentada'>
                            <table className='table'>
                                <tr>
                                    <td>{item.titulo}</td>
                                    <td>{item.fechaInicio}</td>
                                    <td>{item.fechaFin}</td>
                                    <td>{item.fechaEntrega}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.retraso}</td>
                                    <td>Q{item.mora}.00</td>
                                    <td>Q{item.precioAlquiler}</td>
                                    <td>Q{item.precioAlquiler + item.mora}</td>
                                </tr>
                            </table>
                            {(item.retraso > 0 && item.estado === 'En alquiler') && (
                                <div className="alert alert-danger" role="alert">
                                    ¡Tienes días de retraso al devolver esta película!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <footer className='footer'>
                <h3>PopCornFlix el mejor lugar para rentar peliculas</h3>
                <p>Copyrigh- Derechos reservados sobre el sitio web</p>
            </footer>
        </>
    );
}

export default Historial