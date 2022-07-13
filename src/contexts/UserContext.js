import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
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
  isDeleting: false,
  isUpdatingPassword: false,
  isUpdatingUserInfo: false,
  alert: {
    isOpen: false,
    message: '',
    type: '',
    color: '',
  },
};

export const UserProvider = ({ children }) => {
  const { currentUser, handleSignout } = useContext(AuthContext);
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const [isModalReAuthOpen, setIsModalReAuthOpen] = useState(false);

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
          handleSignout();
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

  const changePassword = async (password) => {
    if (password === state.newPassword) {
      setIsModalReAuthOpen(false);
      dispatch({ type: 'PASSWORD_ALREADY_USED' });
    } else {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );

      await reauthenticateWithCredential(auth.currentUser, credential);

      // Pass result.user here
      await updatePassword(currentUser, state.newPassword)
        .then(() => {
          dispatch({ type: 'UPDATED_PASSWORD' });
          setIsModalReAuthOpen(false);
          alert('password updated');
          // Update successful.
        })
        .catch((error) => {
          // An error ocurred
          console.log(error);
          alert(error.message);
          // ...
        });

      console.log('success in updating');
    }
  };

  const deleteAccount = async (password) => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    const result = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );

    // Pass result.user here
    await deleteUser(result.user);

    console.log('success in deleting');
  };

  const closeAlert = () => {
    dispatch({ type: 'CLOSE_ALERT' });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
        createUser,
        loginUserWithEmailAndPassword,
        loginWithGoogle,
        deleteAccount,
        changePassword,
        isModalReAuthOpen,
        closeAlert,
        setIsModalReAuthOpen,
      }}>
      {children}
    </UserContext.Provider>
  );
};
