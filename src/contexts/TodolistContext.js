import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { createContext, useReducer } from 'react';
import { TodolistReducer } from '../reducers/Todolist.reducer';
import { auth, db } from '../utils/firebase-config';

const initialState = {
  loading: false,
  todo: '',
  todoArray: [],
  openModal: false,
  alert: {
    open: false,
    type: '',
    message: '',
  },
};

export const TodolistContext = createContext();

export const TodolistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodolistReducer, initialState);

  const fetchTodos = async () => {
    const docRef = doc(db, 'todos', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch({ type: 'FETCH_TODOS', payload: docSnap.data().todos });
    } else {
      console.log('No such document!');
      return;
    }
  };

  const addTodo = async () => {
    const todosRef = doc(db, 'todos', auth.currentUser.uid);
    const docSnap = await getDoc(todosRef);
    if (docSnap.exists()) {
      await updateDoc(todosRef, {
        todos: arrayUnion(state.todo),
      });
    } else {
      await setDoc(todosRef, {
        todos: [state.todo],
      });
    }
  };

  const closeAlert = () => {
    state.alert.open = false;
  };

  return (
    <TodolistContext.Provider
      value={{ ...state, dispatch, fetchTodos, addTodo, closeAlert }}>
      {children}
    </TodolistContext.Provider>
  );
};
