import { useNavigate } from "react-router-dom";
import './Styles/Admin.css';

function Admin() {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login')

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
                            <li className='casilla'><a href="/ingresarPeliculas" className='link'>Ingresar peliculas <figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="" className='link'>Actualizar contenido <figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="" className='link'>Elimininar contenido<figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="" className='link'>Eliminar usuarios<figure className='figura'></figure></a></li>
                            <li className='casilla'><button class="btn btn-danger" id='btn' onClick={handleLogout}>Cerrar seción</button></li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Admin;