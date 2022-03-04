import React, {createContext, useEffect, useState} from 'react';
import {gql, useMutation} from '@apollo/client';

interface AuthContextType {
    token: any;
    signin: (user: string, password: string) => Promise<boolean>;
    signout: () => void;
    signup: (name: string, user: string, password: string) => Promise<boolean>;
}

interface Token {
    token: string;
    expired_at: string;
}

interface LoginToken {
    login: Token;
}

interface CreateToken {
    createUser: Token;
}

  

const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    let [token, setToken] = useState<string | null>(null);

    const [signinMutation, {}] = useMutation(gql`mutation Login($username: String!, $password: String!) {
        login(input: {username: $username, password: $password}) {
          token
          expired_at
        }
      }`);
    
    
    const [signupMutation, {}] = useMutation(gql`
        mutation CreateUser($name: String!, $username: String!, $password: String!) {
            createUser(input:{
                name: $name, 
                username: $username, 
                password: $password
            }) {
                token
                expired_at
            }
        }`)

    let signin = async (email: string, password: string) => {
        try {
            const { data } = await signinMutation({
                variables: {
                    username: email,
                    password
                }
            })
        setToken((data as LoginToken).login.token);
        } catch {
            return false;
        }
        return true;
    };

    let signout = () => {
        setToken(null);
        return;
    };

    let signup = async (name: string, email: string, password: string) => {
        try {
            const { data } = await signupMutation({
                variables: {
                    name,
                    username: email,
                    password
                }
            })
            setToken((data as CreateToken).createUser.token);
        } catch {
            return false
        }
        return true;
      };

    let value = { token, signin, signout, signup };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export {AuthContext, AuthProvider} 