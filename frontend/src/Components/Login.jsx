import React, { useState }  from 'react';
import './Styles/Login.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [cookies, setCookie] = useCookies(['usuario']);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            correo: correo,
            contraseña: contraseña
        }

        fetch(`http://localhost:5000/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res.success) {
                    const dataUser = res.user;
                    setCookie('usuario', dataUser);
                    if (dataUser.role === '0') {
                        alert(`Bienvenido: Administrador`)
                        navigate('/admin')
                    } else if (dataUser.role === '1') {
                        alert(`Bienvenido: ${dataUser.nombre} ${dataUser.apellido}`)
                        navigate('/user')
                    }
                } else {
                    alert(`Correo y/o contraseña es incorrecto.`)
                }

                setCorreo("")
                setContraseña("")
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="login-background">
            <div><h1 className='titulo'>PopCornFlix</h1></div>
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Inicio de Sesión</h2>
                                <form onSubmit={handleSubmit} className='form-signin w-100 m-auto'>
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
                                        <button type="submit" className="btn btn-outline-primary btn-lg">Iniciar Sesión</button>
                                    </div>
                                </form>
                                <div><a href="/signup">No tienes cuenta?</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;