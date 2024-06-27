import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import './Styles/Catalogo.css';

function Catalogo() {
    const [peliculas, setPeliculas] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [texto, setTexto] = useState("");
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
    const [peliculaPorRentar, setPeliculaPorRentar] = useState(null); 
    const [comentarioEditando, setComentarioEditando] = useState(null); 
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    const usuarioCookie = cookies.usuario;
    const persona = usuarioCookie ? usuarioCookie.correo : 'Anónimo';
    const nombreP = usuarioCookie ? usuarioCookie.nombre : 'Anónimo';

    useEffect(() => {
        fetch(`http://localhost:5000/peliculas`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                setPeliculas(res.reverse());
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/comentarios`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                const comentariosConBoton = res.reverse().map(comentario => ({
                    ...comentario,
                    mostrarBotonEditar: comentario.persona === persona
                }));
                setComentarios(comentariosConBoton);
            })
            .catch((error) => console.error(error));
    }, [persona]);

    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login');
    };

    const toggleCardFondo = (index) => {
        setPeliculas((prevState) =>
            prevState.map((pelicula, i) =>
                i === index ? { ...pelicula, isVisible: !pelicula.isVisible } : pelicula
            )
        );
    };

    const comentar = (index) => {
        setPeliculaSeleccionada(peliculas[index]);
        document.body.classList.add('no-scroll');
        const topElement = document.getElementById('TOP');
        if (topElement) {
            topElement.scrollIntoView({ behavior: 'smooth' });
        }

        fetch(`http://localhost:5000/comentarios`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                const comentariosConBoton = res.reverse().map(comentario => ({
                    ...comentario,
                    mostrarBotonEditar: comentario.persona === persona
                }));
                setComentarios(comentariosConBoton);
            })
            .catch((error) => console.error(error));
    };

    const rentar = (index) => {
        setPeliculaPorRentar(peliculas[index])
        document.body.classList.add('no-scroll');

        const topElement = document.getElementById('TOP');
        if (topElement) {
            topElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const cancelarRenta = () => {
        document.body.classList.remove('no-scroll');
        setPeliculaPorRentar(null);
    }

    const rentarPelicula = () => {

        const data = {
            persona: persona,
            precioAlquiler : peliculaPorRentar.precioAlquiler
        };

        fetch(`http://localhost:5000/rentar/${peliculaPorRentar.titulo}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                alert(res.response)
                setPeliculas(res.data.reverse());
                setPeliculaPorRentar(null);
                document.body.classList.remove('no-scroll');
            })
            .catch((error) => console.error(error));
            
            
    }

    const salir = () => {
        document.body.classList.remove('no-scroll');
        setPeliculaSeleccionada(null);
        setTexto("");
    };

    const editarComentario = (index) => {
        const comentariosDePelicula = comentarios.filter(comentario => comentario.titulo === peliculaSeleccionada.titulo);
        setComentarioEditando(index); 
        setTexto(comentariosDePelicula[index].texto);
    };

    const cancelarEdicion = () => {
        setComentarioEditando(null);
        setTexto("");
    };

    const borrar = (index) => {
        const comentariosDePelicula = comentarios.filter(comentario => comentario.titulo === peliculaSeleccionada.titulo);
        

        fetch(`http://localhost:5000/comentarios/${comentariosDePelicula[index].posicion}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then(() => {
            alert('Eliminado correctamente');
            cancelarEdicion();
            comentariosDePelicula.splice(index, 1)
            setComentarios(comentariosDePelicula)
        })
        .catch((error) => console.error(error));

    }

    const actualizarComentario = (index) => {

        const comentariosDePelicula = comentarios.filter(comentario => comentario.titulo === peliculaSeleccionada.titulo);
        const data = {
            titulo: peliculaSeleccionada.titulo,
            persona: persona,
            nombre: nombreP,
            texto: texto,
        };

                fetch(`http://localhost:5000/comentarios/${comentariosDePelicula[index].posicion}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then(() => {
                alert('Editado correctamente');
                cancelarEdicion();
                comentar(index)
            })
            .catch((error) => console.error(error));
    }

    const handleMouseLeave = (index) => {
        setPeliculas((prevState) =>
            prevState.map((pelicula, i) =>
                i === index ? { ...pelicula, isVisible: false } : pelicula
            )
        );
    };

    const subirComentario = (event) => {
        event.preventDefault();
        if (!peliculaSeleccionada) return;

        const data = {
            titulo: peliculaSeleccionada.titulo,
            persona: persona,
            nombre: nombreP,
            texto: texto
        };

        fetch(`http://localhost:5000/comentarios`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })

            .then((response) => response.json())
            .then(() => {
                alert('Comentario creado correctamente');
                setComentarios(prevComentarios =>[data, ...comentarios]);
                cancelarEdicion();
                document.body.classList.remove('no-scroll');
                comentar(peliculas.findIndex(p => p.titulo === peliculaSeleccionada.titulo));
            })
            .catch((error) => console.error(error));
                
    }

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
            <section>
                <div>
                    <img src="src/Components/Imagenes/FondoCine.jpg" alt="PopCornFlix" />
                    <h1 className='titulo'>POPCORNFLIX</h1>
                </div>
                <div className='catalogo' id='TOP'>
                    <h1>Catalogo</h1>
                    <figure className='linea'></figure>
                    <a name="catalogo"></a>
                </div>
                <div className='targetaPeli' style={{ height: "auto", width: "100%", top: "10", paddingRight: "5%", paddingLeft: "5%" }}>
                    {peliculas.map((item, index) => (
                        <div className="card mb-3 mb-5" onMouseLeave={() => handleMouseLeave(index)} onClick={() => toggleCardFondo(index)} id='card' key={index}>
                            <img className="card-img-top" src={item.image} alt="" />
                            <p className='vermas'>Ver más (Haz clic)</p>
                            <div className="card-body" id='card-body'>
                                <h5 className="card-title" id='card-title'>{item.titulo}</h5>
                                <p className="card-text" id='card-text'> Renta: Q{item.precioAlquiler}</p>
                                
                                <p className="card-text" id='card-text_'> Genero: {item.genero}</p>
                            </div>
                            {item.isVisible && (
                                <div className="card-body" id='card-fondo' style={{ display: 'flex' }}>
                                    <h3 className='itemTitulo'>{item.titulo}</h3>
                                    <div className='card-info'>
                                        <p className='itemP'>{item.sinopsis}</p>
                                        <p className='itemP'>Director: {item.director}</p>
                                        <p className="card-text" id='card-text'> Renta: Q{item.precioAlquiler}</p>
                                
                                <p className="card-text" id='card-text_'> Genero: {item.genero}</p>
                                        <p className="card-text" id='card-text_'> Duración: {item.duracion}</p>
                                <p className="card-text" id='card-text_'> Alquiler: {item.alquiler}hrs</p>
                                        <p className='itemP'>Estreno: {item.estreno}</p>
                                    </div>
                                    <button type="button" onClick={() => comentar(index)} className="btn btn-outline-dark">Comentar</button>
                                    <button type="button" className="btn btn-outline-dark" onClick={() => rentar(index)}>Rentar</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {peliculaSeleccionada && (
                    <div id='comentarios' class="scrollable-container">
                        <h3 id='getTitulo'>{peliculaSeleccionada.titulo}</h3>
                        <p className='nombreCom'>Comentario de: {persona}</p>
                        <form onSubmit={subirComentario} className='form-signin w-100 m-auto'>
                            <div className="form-floating" style={{ width: "100%" }}>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Escribe tu comentario"
                                    onChange={(e) => setTexto(e.target.value)}
                                    value={texto}
                                />
                                <label htmlFor="floatingInput">Comentario</label>
                            </div>
                            <div className="text-center" id='botones'>
                                <button type="submit" className="btn btn-outline-primary btn-lg">Enviar</button>
                                <button type="button" className="btn btn-outline-primary btn-lg" onClick={salir}>Cancelar</button>
                            </div>
                        </form>
                        <div className="comentarios-lista">
                            <h4>Comentarios anteriores:</h4>
                            {comentarios
                                .filter(comentario => comentario.titulo === peliculaSeleccionada.titulo)
                                .map((comentario, index) => (
                                    <div key={index} className="comentario" id='comentario_'>
                                        <p><strong>{comentario.nombre}</strong>: {comentario.texto}</p>
                                        {comentario.mostrarBotonEditar && (
                                            <button className='btn btn-outline-secondary' onClick={() => editarComentario(index)}>Editar</button>
                                        )}
                                        {comentarioEditando === index && (
                                            <div >
                                                <form id="input" onSubmit={(e) => { e.preventDefault(); actualizarComentario(index); }}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Escribe tu comentario"
                                                        onChange={(e) => setTexto(e.target.value)}
                                                        value={texto}
                                                    />
                                                    <button className='btn btn-outline-secondary' type='submit'>Enviar</button>
                                                    <button className='btn btn-outline-secondary' type='button' onClick={() => borrar(index)}>Eliminiar</button>
                                                    <button className='btn btn-outline-secondary' type='button' onClick={cancelarEdicion}>Cancelar</button>
                                                    
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
                {peliculaPorRentar && (
                    <div className='contRentar'>
                    <div className='rentar'>
                        <h1 className='tituloRenta'>Rentar: {peliculaPorRentar.titulo}</h1>
                        <div className='contPR'>
                            <img src={peliculaPorRentar.image} alt="" />
                        </div>
                        <div className='datosRenta'>
                            <h3>Datos de renta</h3>
                            <p>Precio de renta: Q{peliculaPorRentar.precioAlquiler}</p>
                            <p>Renta durante: {peliculaPorRentar.alquiler}hrs</p>
                            <p><strong>Al rentar esta pelicula no podrá rentar más</strong></p>
                            <p>Terminos y condiciones: Al rentar un pelicula usted se compromete a devolverla en el lapso de tiempo establecido de 48hrs, en caso contrario se le cobrara Q5 de mora por cada dia de retraso.</p>
                            <button className='btn btn-outline-secondary' type='button' onClick={rentarPelicula}>Rentar</button>
                            <button className='btn btn-outline-secondary' type='button' onClick={cancelarRenta}>Cancelar</button>
                        </div>
                    </div>
                    </div>
                )}
            </section>
            <footer id='footer'>
                <h3>PopCornFlix el mejor lugar para rentar peliculas</h3>
                <p>Copyrigh- Derechos reservados sobre el sitio web</p>
            </footer>
        </>
    );
}

export default Catalogo;

