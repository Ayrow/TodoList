import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { createContext, useEffect, useState, useContext } from 'react';
import { auth } from '../utils/firebase-config';

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

export interface IUserContextType {
  currentUser: User;
  handleSignout: () => void;
}

export const AuthContext = createContext<IUserContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: IAuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

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

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
