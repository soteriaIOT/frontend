import React, {useCallback, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Button} from '@shopify/polaris';

import {useApolloClient} from '@apollo/client'
import useAuth from '../../hooks/useAuth';

export default function Logout() {
    const auth = useAuth();

    const navigate = useNavigate();
    const client = useApolloClient()

    const handleSubmit = useCallback(() => {
        auth.signout();
        // Don't show toast when navigating to home-page
        client.clearStore();
        navigate("/", { state: {from: {pathname:""}} })
    }, []);


    return (
    <Button onClick={handleSubmit}>
        Logout
    </Button>
    );
}
