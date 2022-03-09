import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';


export default function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token") && !auth.token) {
            navigate('/', { state: { from: location } });
        }
    }, [auth]);


    return children;
}
