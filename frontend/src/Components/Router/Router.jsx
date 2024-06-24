import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../Login';
import SignUp from '../SignUp';
import Admin from '../Admin';

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/login"/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/admin' element={<Admin />} />
            </Routes>
        </BrowserRouter>
    )
}


export default Router

