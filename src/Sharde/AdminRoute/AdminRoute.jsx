import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isLoadingAdmin] = useAdmin()

    let location = useLocation();

    if (loading || isLoadingAdmin) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if ( user || isAdmin) {
        return children
    }

    return <Navigate to={'/'} state={{ from: location }} replace></Navigate>
};

export default AdminRoute;