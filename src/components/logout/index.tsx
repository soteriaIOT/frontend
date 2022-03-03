import React, {useCallback, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Button} from '@shopify/polaris';

import useAuth from '../../hooks/useAuth';

export default function Logout() {
    const auth = useAuth();

    const navigate = useNavigate();

    const handleSubmit = useCallback(() => {
        auth.signout(() => navigate("/", { state: {location: {pathname:""}} }));
    }, []);


    return (
    <Button onClick={handleSubmit}>
        Logout
    </Button>
    );
}
