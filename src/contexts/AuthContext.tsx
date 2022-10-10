import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebase-config';
import { TodolistContext } from './TodolistContext';

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

export interface IUserContextType {
  currentUser: User | null;
  handleSignout: () => void;
}

export const AuthContext = createContext<IUserContextType>(null);

export const AuthProvider = ({ children }: IAuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, handleSignout }}>
      {children}
    </AuthContext.Provider>
  );
};
