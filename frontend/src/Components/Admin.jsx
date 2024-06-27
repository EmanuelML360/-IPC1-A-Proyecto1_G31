import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import './Styles/Admin.css';

function Admin() {
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    const usuarioCookie = cookies.usuario;
    const handleLogout = () => {
        navigate('/login')
        removeCookie('usuario');
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
                <h1>Sistema de administración PopCornFlix</h1>
                <div className="div">
                    <p>Bienvenido admin: {usuarioCookie.nombre}  {usuarioCookie.apellido}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
                </div>
            </section>
        </>
    );
};

export default Admin;