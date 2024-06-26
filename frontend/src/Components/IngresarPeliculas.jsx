import React, { useState, useEffect } from 'react';
import './Styles/IngresarPeliculas.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Admin from './Admin';

function IngresarPeliculas() {

    const [titulo, setTitulo] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [precioAlquiler, setPrecioAlquiler] = useState("");
    const [director, setDirector] = useState("");
    const [estreno, setEstreno] = useState("");
    const [duracion, setDuracion] = useState("");
    const [genero, setGenero] = useState("");
    const alquiler = "48 hrs";
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [selectedImage, setSelectedImage] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        removeCookie('usuario');
        navigate('/login')

    };

    const handleImageChange = (event) => {
        // Evita que se recargue la página
        event.preventDefault();
        // Agarramos el primer archivo
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                // Guardamos la imagen para que se muestre en la vista previa
                setSelectedImage(URL.createObjectURL(file));
                // Guardamos la base 64 para mandarla al backend
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = () => {
        const userName = cookies.usuario;
        const data = {
            titulo: titulo,
            sinopsis: sinopsis,
            precioAlquiler: precioAlquiler,
            director: director,
            estreno: estreno,
            duracion: duracion,
            genero: genero,
            alquiler: alquiler,
            image: base64Image
        }

        fetch(`http://localhost:5000/peliculas`, {
            method: "POST",
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
            <Admin />
            <section className='barraTitulo'>
                <h1>Ingresar nuevo contenido</h1>
            </section>
            <section className='formulario'>
                <form className='form-signin w-100 m-auto'>
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
                        <label htmlFor="floatingInput">Sinpsis</label>
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
                        <label htmlFor="file-upload" className="btn btn-outline-warning" style={{ fontSize: "19px", width: "100%", height: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16" style={{ marginRight: "1%" }}>
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
                                {selectedImage && <img src={selectedImage} alt="Selected" style={{ objectFit: "cover", width: "22rem", height: "30rem", marginTop: "100px" }} />}
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "100%", marginTop: "5%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button type="button" className="btn btn-outline-light" onClick={handlePost}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                            </svg>
                            {" Nueva Pelicula"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default IngresarPeliculas