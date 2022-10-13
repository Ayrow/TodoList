import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { UserReducer } from '../reducers/User.reducer';
import { auth, db } from '../utils/firebase-config';
import { AuthContext } from './AuthContext';
import { TodolistContext } from './TodolistContext';

interface IUserContextProviderProps {
  children: ReactNode;
}

export type UserAction = {
  type: string;
  payload?: {
    key?: string;
    value?: string;
  };
};

export interface IUserInitialState {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  newPassword: string;
  isDeleting: boolean;
  isUpdatingPassword: boolean;
  isUpdatingUserInfo: boolean;
  alert: {
    isOpen: boolean;
    message: string;
    type: string;
    color: string;
  };
}

const initialState: IUserInitialState = {
  username: '',
  name: '',
  email: '',
  phoneNumber: '',
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

interface IUser {
  profileimage?: string;
  username: string;
  email: string;
  phoneNumber?: string;
}

interface IUserContext {
  state: IUserInitialState;
  user: IUser | null;
  dispatch: React.Dispatch<UserAction>;
  createUser: () => void;
  loginUserWithEmailAndPassword: () => void;
  fetchUserInfo: () => void;
  updateAccount: (password: string) => void;
  deleteAccount: (password: string) => void;
  changePassword: (password: string) => void;
  isModalReAuthOpen: boolean;
  closeAlert: () => void;
  setIsModalReAuthOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<Partial<IUserContext>>({
  state: initialState,
  dispatch: () => undefined,
});

export const UserProvider = ({ children }: IUserContextProviderProps) => {
  const { currentUser } = useContext(AuthContext);
  const { fetchTodos } = useContext(TodolistContext);

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const [isModalReAuthOpen, setIsModalReAuthOpen] = useState(false);
  const [user, setUser] = useState<IUser>({
    username: '',
    email: '',
  });

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
        // dispatch({ type: 'EMPTY_FORMS' });
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
        fetchTodos();
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          alert('Wrong credentials');
        }
      });
    fetchTodos();
  };

  // const loginWithGoogle = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       console.log(credential);
  //       const token = credential.accessToken;
  //       console.log('token:', token);
  //       const user = result.user;
  //       console.log('user:', user);

  //       const addUserToDb = async () => {
  //         await setDoc(doc(db, 'users', user.uid), {
  //           username: user.displayName,
  //           email: user.email,
  //         });
  //       };
  //       addUserToDb();
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       console.log(errorCode);
  //       const errorMessage = error.message;
  //       console.log(errorMessage);
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       console.log(email);
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       console.log(credential);
  //       // ...
  //     });
  // };

  const fetchUserInfo = async () => {
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data() as IUser);
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  const changePassword = async (password: string) => {
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
      dispatch({ type: 'EMPTY_FORMS' });
      console.log('success in updating');
    }
  };

  const updateAccount = async (password: string) => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    await reauthenticateWithCredential(auth.currentUser, credential);
    const userRef = doc(db, 'users', currentUser.uid);

    if (state.email) {
      await updateEmail(auth.currentUser, state.email)
        .then(() => {
          // const userRef = doc(db, 'users', currentUser);
          updateDoc(userRef, {
            email: state.email,
          });
        })
        .catch((error) => {
          console.log('error', error);
          // An error occurred
          // ...
        });
    }
    if (state.phoneNumber) {
      await updateDoc(userRef, {
        phoneNumber: state.phoneNumber,
      });
    }
    if (state.username) {
      await updateDoc(userRef, {
        username: state.username,
      });
    }
    setIsModalReAuthOpen(false);
    dispatch({ type: 'ALERT_UPDATED_ACCOUNT' });
    fetchUserInfo();
  };

  const deleteAccount = async (password: string) => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );

    const result = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );

    // Pass result.user here
    await deleteDoc(doc(db, 'users', currentUser.uid));
    await deleteDoc(doc(db, 'todos', currentUser.uid));
    await deleteUser(result.user);
    console.log('success in deleting your account');
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
        fetchUserInfo,
        user,
        updateAccount,
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
