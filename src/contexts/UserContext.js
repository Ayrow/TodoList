import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { createContext, useReducer } from 'react';
import { UserReducer } from '../reducers/User.reducer';
import { auth, db } from '../utils/firebase-config';

export const UserContext = createContext();

const initialState = {
  user: {},
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const createUser = () => {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const addUserToDb = async () => {
          await setDoc(doc(db, 'users', auth.currentUser.uid), {
            username: state.username,
            email: state.email,
          });
        };
        addUserToDb();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider value={{ ...state, dispatch, createUser }}>
      {children}
    </UserContext.Provider>
  );
};
