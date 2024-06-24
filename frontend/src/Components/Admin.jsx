import './Styles/Admin.css';

function Admin() {

    return (
        <>
            <header>
                <nav>
                    <div className='contIcono'>
                        <img src="/src/Components/Imagenes/Popcornflix.png" alt="PopCornFlix" />
                    </div>
                    <div className='menu'>
                        <ul className='submenu'>
                            <li className='casilla'><a href="" className='link'>Ingresar peliculas <figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="" className='link'>Actualizar contenido <figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="" className='link'>Elimininar contenido<figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="" className='link'>Eliminar usuarios<figure className='figura'></figure></a></li>
                            <li className='casilla'><a href="" className='link'>Mi perfil <figure className='figura'></figure></a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Admin;