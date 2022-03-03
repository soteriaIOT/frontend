import React, {createContext, useState} from 'react';

const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
      console.log("SIGNING IN")
    },
    signout(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
      console.log("SIGNING OUT")
    },
    signup(callback: VoidFunction) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100);
      console.log("SIGNING UP")
    },

  };

interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
    signup: (user: string, callback: VoidFunction) => void;
}


const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = useState<any>(null);
  
    let signin = (newUser: string, callback: VoidFunction) => {
      return fakeAuthProvider.signin(() => {
        setUser(newUser);
        callback();
      });
    };
  
    let signout = (callback: VoidFunction) => {
      return fakeAuthProvider.signout(() => {
        setUser(null);
        callback();
      });
    };

    let signup = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signup(() => {
          setUser(newUser);
          callback();
        });
      };
  
    let value = { user, signin, signout, signup };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export {AuthContext, AuthProvider}