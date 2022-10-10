import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebase-config';

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

interface ICurrentUserType {
  currentUser: {
    username: string;
    name: string;
    email: string;
    phoneNumber: number;
  };
}

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: IAuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUserType>(null);

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
