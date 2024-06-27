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

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/login"/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/user' element={<Catalogo />} />
                <Route path='/ingresarPeliculas' element={<IngresarPeliculas />} />
                <Route path='/user/historial' element={<Historial />} />
                <Route path='/user/alquilada' element={<ALquilada />} />
                <Route path='/user/devolverAlquilada' element={<DevolverPelicula />} />
                <Route path='/user/perfil' element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    )
}


export default Router

