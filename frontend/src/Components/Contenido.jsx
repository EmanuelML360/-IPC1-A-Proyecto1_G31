import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import './Styles/Contenido.css';

function Contenido() {
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    const [peliculas, setPeliculas] = useState([]);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
    const [peliculaPorEditar, setPeliculaPorEditar] = useState(null); 
    const [titulo, setTitulo] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [precioAlquiler, setPrecioAlquiler] = useState("");
    const [director, setDirector] = useState("");
    const [estreno, setEstreno] = useState("");
    const [duracion, setDuracion] = useState("");
    const [genero, setGenero] = useState("");
    const alquiler = 48;
    const [selectedImage, setSelectedImage] = useState('');
    const [base64Image, setBase64Image] = useState('');

    const handleLogout = () => {
        navigate('/login')
        removeCookie('usuario');
    };

    useEffect(() => {
        fetch(`http://localhost:5000/peliculas/admin`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                setPeliculas(res.reverse());
            })
            .catch((error) => console.error(error));
    }, []);


    const toggleCardFondo = (index) => {
        setPeliculas((prevState) =>
            prevState.map((pelicula, i) =>
                i === index ? { ...pelicula, isVisible: !pelicula.isVisible } : pelicula
            )
        );
    };

    const handleMouseLeave = (index) => {
        setPeliculas((prevState) =>
            prevState.map((pelicula, i) =>
                i === index ? { ...pelicula, isVisible: false } : pelicula
            )
        );
    };

    const salir = () => {
        setPeliculaSeleccionada(null);
        setTexto("");
    };

    const editar = (index) => {
        setPeliculaPorEditar(peliculas[index]);
        setTitulo(peliculas[index].titulo);
        setSinopsis(peliculas[index].sinopsis);
        setPrecioAlquiler(peliculas[index].precioAlquiler);
        setDirector(peliculas[index].director);
        setEstreno(peliculas[index].estreno);
        setDuracion(peliculas[index].duracion);
        setGenero(peliculas[index].genero);
        setSelectedImage(peliculas[index].image);
    }

    const cancelarEdicion = () => {
        setPeliculaPorEditar(null);
    }

    const handleImageChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(URL.createObjectURL(file));
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const eliminar = (index) => {
        fetch(`http://localhost:5000/peliculas/${peliculas[index].titulo}`, {
            method: "DELETE"  
        })
            
            .then((response) => response.json())
            .then((res) => { 
                console.log(res)
                alert(res.response)
            })
            .catch((error) => console.error(error));
    };

    const actualizarPelicula = () => {
        const userName = cookies.usuario;
        const precioAlquiler_ = parseInt(precioAlquiler, 10) 
        const data = {
            titulo: titulo,
            sinopsis: sinopsis,
            precioAlquiler: precioAlquiler_,
            director: director,
            estreno: estreno,
            duracion: duracion,
            genero: genero,
            alquiler: alquiler,
            image: base64Image
        }

        fetch(`http://localhost:5000/peliculas/${peliculaPorEditar.titulo}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
            
        })
            
            .then((response) => response.json())
            .then((res) => { 
                console.log(res)
                alert(res.response)
                setTitulo("")
                setSinopsis("")
                setDirector("")
                setDuracion("")
                setEstreno("")
                setGenero("")
                setPrecioAlquiler("")
                setBase64Image("")
                setSelectedImage('')
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
            <section className="sectionAdmin">
                <h1>Peliculas actualmente ingresadas</h1>
                <div className='targetaPeli' style={{ height: "auto", width: "100%", top: "10", paddingRight: "5%", paddingLeft: "5%" }}>
                    {peliculas.map((item, index) => (
                        <div className="card mb-3 mb-5" onMouseLeave={() => handleMouseLeave(index)} onClick={() => toggleCardFondo(index)} id='card' key={index}>
                            <img className="card-img-top" src={item.image} alt="" />
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
                                    <button type="button" onClick={() => editar(index)} className="btn btn-outline-dark">Editar</button>
                                    <button type="button" className="btn btn-outline-dark" onClick={() => eliminar(index)}>Eliminar</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {peliculaPorEditar && (
                    <div className='editar'>
                        <h1 className='tituloRenta'>Editar: {peliculaPorEditar.titulo}</h1>
                        <div className='datosEditar'>
                            <h3>Datos de pelicula</h3>
                            <form onSubmit={actualizarPelicula} className='form-signin w-100 m-auto'>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder=""
                                        onChange={(e) => setTitulo(e.target.value)}
                                        value={titulo}
                                    />
                                    <label htmlFor="floatingInput">Titulo</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder=""
                                        onChange={(e) => setSinopsis(e.target.value)}
                                        value={sinopsis}
                                    > </textarea>
                                    <label htmlFor="floatingInput">Sinopsis</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder=""
                                        onChange={(e) => setPrecioAlquiler(e.target.value)}
                                        value={precioAlquiler}
                                    />
                                    <label htmlFor="floatingInput">Precio de alquiler</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder=""
                                        onChange={(e) => setDirector(e.target.value)}
                                        value={director}
                                    />
                                    <label htmlFor="floatingInput">Director</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder=""
                                        onChange={(e) => setEstreno(e.target.value)}
                                        value={estreno}
                                    />
                                    <label htmlFor="floatingInput">Estreno</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder=""
                                        onChange={(e) => setDuracion(e.target.value)}
                                        value={duracion}
                                    />
                                    <label htmlFor="floatingInput">Duración</label>
                                </div>
                                <div className="form-floating" style={{ width: "100%" }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder=""
                                        onChange={(e) => setGenero(e.target.value)}
                                        value={genero}
                                    />
                                    <label htmlFor="floatingInput">Genero</label>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginBottom: "10px"}}>
                                    <label htmlFor="file-upload" className="btn btn-outline-warning" style={{ fontSize: "19px", width: "25%", height: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10%" height="auto" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16" style={{ marginRight: "1%" }}>
                                            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z" />
                                        </svg>
                                        {"Elige una imagen "}
                                    </label>
                                    <input onChange={handleImageChange} id="file-upload" type="file" accept="image/*" style={{ display: "none" }} />
                                </div>
                                <div className='imagenMostrar'>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxHeight: "30rem", height: "20rem", marginTop: "5%" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", maxHeight: "30rem", maxWidth: "25rem" }}>
                                            {selectedImage && <img src={selectedImage} alt="Selected" style={{ objectFit: "cover", width: "22rem", height: "30rem", marginTop: "300px" }} />}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: "100%", marginTop: "5%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <button type="submit" className="btn btn-outline-light" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" marginRight="2%" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                        </svg>
                                        {"Actualizar Pelicula"}
                                    </button>
                                </div>
                            </form>
                            <button className='btn btn-outline-secondary' type='button' onClick={cancelarEdicion}>Cancelar</button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Contenido