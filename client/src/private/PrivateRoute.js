import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/authContext';


const PrivateRoute = () => {
    const { user, loading } = useAuth();

    // While loading, you can display a loader or do nothing
    if (loading) return null;

    // if the user is not authenticated, redirect to login page 
    if (!user) {
        return <Navigate to="/login" />
    }

    // otherwise, render the nested routes (protected pages)
    return <Outlet />
}

export default PrivateRoute;