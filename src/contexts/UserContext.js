import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { UserReducer } from '../reducers/User.reducer';
import { auth, db } from '../utils/firebase-config';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

const initialState = {
  user: {},
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const UserProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const createUser = () => {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const addUserToDb = async () => {
          await setDoc(doc(db, 'users', currentUser.uid), {
            username: state.username,
            email: state.email,
          });
        };
        addUserToDb();
        dispatch({ type: 'EMPTY_FORMS' });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('email already in use');
        }
      });
  };

  const loginUserWithEmailAndPassword = () => {
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider
      value={{ ...state, dispatch, createUser, loginUserWithEmailAndPassword }}>
      {children}
    </UserContext.Provider>
  );
};
