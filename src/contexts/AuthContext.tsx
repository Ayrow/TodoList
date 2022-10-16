import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { createContext, useEffect, useState, useContext } from 'react';
import { auth } from '../utils/firebase-config';

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

export interface IUserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleSignout: () => void;
}

export const AuthContext = createContext<IUserContextType | undefined>(
  undefined
);

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
    const listener = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
    });

    return () => {
      listener();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, handleSignout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}
