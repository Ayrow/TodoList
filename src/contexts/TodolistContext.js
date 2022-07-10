import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { createContext, useContext, useReducer } from 'react';
import { TodolistReducer } from '../reducers/Todolist.reducer';
import { db } from '../utils/firebase-config';
import { AuthContext } from './AuthContext';

const initialState = {
  loading: false,
  todo: '',
  todoToUpdate: '',
  editID: null,
  isEditing: false,
  todoArray: [],
  isModalOpen: false,
  alert: {
    open: false,
    type: '',
    message: '',
  },
};

export const TodolistContext = createContext();

export const TodolistProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(TodolistReducer, initialState);

  const fetchTodos = async () => {
    const docRef = doc(db, 'todos', currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch({ type: 'FETCH_TODOS', payload: docSnap.data().todos });
    } else {
      console.log('There is no document');
      return;
    }
  };

  const addTodo = async () => {
    const todosRef = doc(db, 'todos', currentUser.uid);
    const docSnap = await getDoc(todosRef);
    if (docSnap.exists()) {
      await updateDoc(todosRef, {
        todos: arrayUnion(state.todo),
      });
      dispatch({ type: 'ADDING_TODO' });
    } else {
      await setDoc(todosRef, {
        todos: [state.todo],
      });
    }
  };

  const deleteTodo = async (todoToUpdate) => {
    const todoRef = doc(db, 'todos', currentUser.uid);
    await updateDoc(todoRef, {
      todos: arrayRemove(todoToUpdate),
    });
    dispatch({ type: 'DELETE_TODO' });
  };

  const editTodo = (item, index) => {
    dispatch({ type: 'EDIT_TODO', payload: { item, index } });
  };

  const updateTodo = async () => {
    const todoRef = doc(db, 'todos', currentUser.uid);
    await updateDoc(todoRef, {
      todos: arrayUnion(state.todoToUpdate),
    });
    dispatch({ type: 'UPDATE_EDIT_TODO' });
  };

  const closeModal = () => {
    state.isModalOpen = false;
    state.isEditing = false;
  };

  const closeAlert = () => {
    state.alert.open = false;
  };

  return (
    <TodolistContext.Provider
      value={{
        ...state,
        dispatch,
        fetchTodos,
        addTodo,
        deleteTodo,
        updateTodo,
        editTodo,
        closeModal,
        closeAlert,
      }}>
      {children}
    </TodolistContext.Provider>
  );
};
