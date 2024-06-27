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
                        } else if (pelicula.estado === "En alquiler"){
                            pelicula.mora = 0;
                        }
                    });
                }
                
                setHistorial(historial_Usuario);
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
                            <td>Mora</td>
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
                                    <td>Q{item.mora}.00</td>
                                    
                                </tr>
                            </table>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Historial