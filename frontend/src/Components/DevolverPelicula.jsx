import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import './Styles/DevolverPelicula.css';

function DevolverPelicula(){
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    const usuarioCookie = cookies.usuario;
    const persona = usuarioCookie ? usuarioCookie.correo : 'Anónimo';
    const nombreP = usuarioCookie ? usuarioCookie.nombre : 'Anónimo';
    const [historial, setHistorial] = useState([]);
    const estado = "En alquiler";

    useEffect(() => {
        const obtenerHistorial = async () => {
            try {
                const respuestaHistorial = await fetch(`http://localhost:5000/historial`, { method: "GET" });
                const historialCompleto = await respuestaHistorial.json();
    
                const historialUsuario = historialCompleto.filter(pelicula => pelicula.persona === persona);
    
                const historialActual = historialUsuario.filter(pelicula => pelicula.estado === estado);
    
                if (historialActual.length > 0) {
                    const peliculaActual = historialActual[0];
                    const respuestaPelicula = await fetch(`http://localhost:5000/peliculas/${peliculaActual.titulo}`, { method: "GET" });
                    const datosPelicula = await respuestaPelicula.json();
    

                    historialActual.forEach(pelicula => {
                        if (pelicula.titulo === peliculaActual.titulo) {
                            pelicula.image = datosPelicula.image;
                        }
                    });
    
                    setHistorial(historialActual);
                } else {
                    setHistorial(historialActual);
                }
            } catch (error) {
                console.error("Error al obtener el historial o las películas:", error);
            }
        };
    
        obtenerHistorial();
    }, [persona, estado]); 


    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login');
    };

    const devolver = (index) => {
        fetch(`http://localhost:5000/devolver/${historial[index].titulo}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((res) => {
                alert(res.response)
                navigate('/user')
            })
            .catch((error) => console.error(error));

    };

    return(
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
                <h1 className='tituloHistorial'>Devolver pelicula rentada por: {persona}</h1>
                <div className='peliculasRentadas'>
                <table className='table'>
                        <tr>
                            <td>Titulo</td>
                            <td>Portada</td>
                            <td>Fecha inicio renta</td>
                            <td>Fecha fin renta</td>
                            <td>Devolver</td>
                        </tr>
                    </table>
                    {historial.map((item, index) => (
                        <div className='peliculaRentada'>
                            <table className='table'>
                                <tr>
                                    <td>{item.titulo}</td>
                                    <td><img className="card-img-top" src={item.image} alt="" /></td>
                                    <td>{item.fechaInicio}</td>
                                    <td>{item.fechaFin}</td>
                                    <td><button className='btn btn-outline-secondary' id='botonDev' type='button' onClick={() => devolver(index)} >Devolver</button></td>
                                    
                                    
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
};

export default DevolverPelicula;