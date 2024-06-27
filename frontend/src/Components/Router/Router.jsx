import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../Login';
import SignUp from '../SignUp';
import Admin from '../Admin';
import Catalogo from '../Catalogo';
import IngresarPeliculas from '../IngresarPeliculas'
import Historial from '../Historial';
import ALquilada from '../Alquilada';
import DevolverPelicula from '../DevolverPelicula';
import Perfil from '../Perfil';
import Contenido from '../Contenido';
import Usuarios from '../Usuarios';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/login"/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/user' element={<Catalogo />} />
                <Route path='/admin/ingresarPeliculas' element={<IngresarPeliculas />} />
                <Route path='/user/historial' element={<Historial />} />
                <Route path='/user/alquilada' element={<ALquilada />} />
                <Route path='/user/devolverAlquilada' element={<DevolverPelicula />} />
                <Route path='/user/perfil' element={<Perfil />} />
                <Route path='/admin/contenido' element={<Contenido />} />
                <Route path='/admin/usuarios' element={<Usuarios />} />
            </Routes>
        </BrowserRouter>
    )
}


export default Router

