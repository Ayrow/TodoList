import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { createContext, useContext, useReducer } from 'react';
import { TodolistReducer } from '../reducers/Todolist.reducer';
import { auth, db } from '../utils/firebase-config';
import { AuthContext } from './AuthContext';

interface ITodolistContextProviderProps {
  children: React.ReactNode;
}

interface ITodoType {
  todo: string;
}

export interface IInitialStateType {
  loading: boolean;
  todo: string;
  todoToUpdate: string;
  editID: null | string;
  isEditing: boolean;
  todoArray: ITodoType[];
  isModalOpen: boolean;
  alert: {
    open: boolean;
    type: string;
    message: string;
  };
}

const initialState: IInitialStateType = {
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

export type TodolistAction =
  | {
      type:
        | 'MISSING_TODO'
        | 'ADDING_TODO'
        | 'DELETE_TODO'
        | 'MISSING_NEW_TODO'
        | 'UPDATE_EDIT_TODO'
        | 'CLEARED_LIST'
        | 'EMPTY_TODO_ARRAY';
    }
  | {
      type: 'FETCH_TODOS' | 'CONFIRM_DELETE' | 'SET_TODO';
      payload: string | ITodoType;
    }
  | { type: 'EDIT_TODO'; payload: { item: string; index: number } };

interface ITodoContext {
  state: IInitialStateType;
  dispatch: React.Dispatch<TodolistAction>;
  fetchTodos: () => void;
  deleteTodo: (todoToUpdate: string) => void;
  updateTodo: (tempList: string[]) => void;
  editTodo: (item: string | ITodoType, index: number) => void;
  clearList: () => void;
  closeModal: () => void;
  closeAlert: () => void;
  addTodo: () => void;
  emptyTodoArray: () => void;
}

export const TodolistContext = createContext<Partial<ITodoContext>>({
  state: initialState,
  dispatch: () => undefined,
});

export const TodolistProvider: React.FC = ({
  children,
}: ITodolistContextProviderProps) => {
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
      dispatch({ type: 'ADDING_TODO' });
    }
    fetchTodos();
  };

  const deleteTodo = async (todoToUpdate: string) => {
    const todoRef = doc(db, 'todos', currentUser.uid);
    await updateDoc(todoRef, {
      todos: arrayRemove(todoToUpdate),
    });
    dispatch({ type: 'DELETE_TODO' });
  };

  const editTodo = (item: string, index: number) => {
    dispatch({ type: 'EDIT_TODO', payload: { item, index } });
  };

  const updateTodo = async (tempList: string[]) => {
    const todoRef = doc(db, 'todos', auth.currentUser.uid);
    await updateDoc(todoRef, {
      todos: tempList,
    });
    dispatch({ type: 'UPDATE_EDIT_TODO' });
  };

  const clearList = async () => {
    await deleteDoc(doc(db, 'todos', currentUser.uid));
    dispatch({ type: 'CLEARED_LIST' });
  };

  const emptyTodoArray = () => {
    dispatch({ type: 'EMPTY_TODO_ARRAY' });
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
        clearList,
        closeModal,
        closeAlert,
        emptyTodoArray,
      }}>
      {children}
    </TodolistContext.Provider>
  );
};
