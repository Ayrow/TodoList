import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useReducer } from 'react';
import { UserReducer } from '../reducers/User.reducer';
import { auth, db, googleProvider } from '../utils/firebase-config';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

const initialState = {
  user: {},
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  newPassword: '',
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
        if (error.code === 'auth/wrong-password') {
          alert('Wrong credentials');
        }
      });
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const token = credential.accessToken;
        console.log('token:', token);
        const user = result.user;
        console.log('user:', user);

        const addUserToDb = async () => {
          await setDoc(doc(db, 'users', user.uid), {
            username: user.displayName,
            email: user.email,
          });
        };
        addUserToDb();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const changePassword = () => {
    updatePassword(currentUser, state.newPassword)
      .then(() => {
        dispatch({ type: 'UPDATED_PASSWORD' });
        // Update successful.
      })
      .catch((error) => {
        console.log(error);
        // An error ocurred
        // ...
      });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
        createUser,
        loginUserWithEmailAndPassword,
        loginWithGoogle,
        changePassword,
      }}>
      {children}
    </UserContext.Provider>
  );
};
