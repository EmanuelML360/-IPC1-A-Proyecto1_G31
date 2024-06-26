import React, { useState }  from 'react';
import './Styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function SignUp(){
    
    const [nombre, setNombre] =useState('');
    const [apellido, setApellido] =useState('');
    const [genero, setGenero] =useState('');
    const [correo, setCorreo] =useState('');
    const [contraseña, setContraseña] =useState('');
    const [fechaNacimiento, setFechaNacimiento] =useState('');
    const [cookies, setCookie] = useCookies(['usuario'])

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            nombre: nombre,
            apellido: apellido,
            genero: genero,
            correo: correo,
            contraseña: contraseña,
            fechaNacimiento: fechaNacimiento,
            role: 1
        }
        if (nombre === "" || apellido === "" || genero === "" || correo === "" || contraseña === "" || fechaNacimiento === "") {
            alert(`Haz dejado un campo en blanco.`)
        } else {
            fetch(`http://localhost:5000/usuarios`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.success) {
                        const dataUser = res.user;
                        alert(`Cuenta creada correctamente: ${dataUser.nombre} ${dataUser.apellido}`)
                        setCookie('usuario', dataUser);
                    } else {
                        alert(`Error al crear la cuenta.`)
                    }
    
                    setNombre("")
                    setApellido("")
                    setCorreo("")
                    setContraseña("")
                    setGenero("")
                    setFechaNacimiento("")
                })
                .catch((error) => console.error(error));
        }

        
    }

    const Regresar = (event) => {
        event.preventDefault();
        navigate('/login')
    }

    return (
        <div className="login-background">
            <div><h1 className='titulo_'>PopCornFlix</h1></div>
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Crear cuenta</h2>
                                <form onSubmit={handleSubmit} className='form-signin w-100 m-auto'>
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

                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="text"
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
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="ejemplo@gmail.com"
                                            onChange={(e) => setCorreo(e.target.value)}
                                            value={correo}
                                        />
                                        <label htmlFor="floatingInput">Correo</label>
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
                                        <button type="submit" className="btn btn-outline-primary btn-lg">Crear</button>
                                        <button type="button" onClick={Regresar} className="btn btn-outline-primary btn-lg">Salir</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp