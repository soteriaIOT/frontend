import React, {createContext, useState, useContext} from 'react';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import {AuthContext} from '../context/auth';
  
function useAuth() {
    return useContext(AuthContext);
}
  

export default useAuth;
