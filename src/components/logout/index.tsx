import React, {useCallback, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Button} from '@shopify/polaris';

export default function Logout() {

    const navigate = useNavigate();

    const handleSubmit = useCallback(() => {
    console.log("logging out");
    navigate("/")
    }, []);


    return (
    <Button onClick={handleSubmit}>
        Logout
    </Button>
    );
}
