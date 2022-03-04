import React, {useCallback, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Button} from '@shopify/polaris';

import useAuth from '../../hooks/useAuth';

export default function Logout() {
    const auth = useAuth();

    const navigate = useNavigate();

    const handleSubmit = useCallback(() => {
        auth.signout();
        // Don't show toast when navigating to home-page
        navigate("/", { state: {from: {pathname:""}} })
    }, []);


    return (
    <Button onClick={handleSubmit}>
        Logout
    </Button>
    );
}
