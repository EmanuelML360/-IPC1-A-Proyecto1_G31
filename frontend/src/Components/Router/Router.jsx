import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../Login';
import SignUp from '../SignUp';
import Admin from '../Admin';
import Catalogo from '../Catalogo';
import IngresarPeliculas from '../IngresarPeliculas'

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
            </Routes>
        </BrowserRouter>
    )
}


export default Router

