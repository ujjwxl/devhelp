import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let token = sessionStorage.getItem('token');
    let auth =  {'token' : token}

    return (
        auth.token ? <Outlet/> : <Navigate to = '/login'/>
    )
}

export default PrivateRoutes