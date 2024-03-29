import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { TodolistReducer } from '../reducers/Todolist.reducer';
import { auth, db } from '../utils/firebase-config';
import { useAuthContext } from './AuthContext';

interface ITodolistContextProviderProps {
  children: ReactNode;
}

// interface ITodoType {
//   todo: string;
// }

export interface IInitialStateType {
  loading: boolean;
  todo: string;
  todoToUpdate: string;
  editID: null | number;
  isEditing: boolean;
  todoArray: string[];
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
        | 'EMPTY_TODO_ARRAY'
        | 'CLOSE_MODAL'
        | 'CLOSE_ALERT'
        | 'TODO_ALREADY_EXISTS';
    }
  | {
      type: 'FETCH_TODOS';
      payload: string[];
    }
  | {
      type: 'CONFIRM_DELETE' | 'SET_TODO';
      payload: string;
    }
  | { type: 'EDIT_TODO'; payload: { item: string; index: number } };

interface ITodoContext {
  state: IInitialStateType;
  dispatch: React.Dispatch<TodolistAction>;
  fetchTodos: () => void;
  deleteTodo: (todoToUpdate: string) => void;
  updateTodo: (tempList: string[]) => void;
  editTodo: (item: string, index: number) => void;
  clearList: () => void;
  closeModal: () => void;
  closeAlert: () => void;
  addTodo: () => void;
  emptyTodoArray: () => void;
}

export const TodolistContext = createContext<ITodoContext | undefined>(
  undefined
);

export const TodolistProvider = ({
  children,
}: ITodolistContextProviderProps) => {
  const { currentUser } = useAuthContext();
  const [state, dispatch] = useReducer(TodolistReducer, initialState);

  const fetchTodos = async () => {
    if (currentUser) {
      const docRef = doc(db, 'todos', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch({ type: 'FETCH_TODOS', payload: docSnap.data().todos });
      } else {
        console.log('There is no document');
        return;
      }
    }
  };

  const addTodo = async () => {
    if (currentUser) {
      const todosRef = doc(db, 'todos', currentUser.uid);
      const docSnap = await getDoc(todosRef);
      if (docSnap.exists()) {
        const checkIfDuplicate = docSnap
          .data()
          .todos.find((item: string) => item === state.todo);
        if (checkIfDuplicate === state.todo) {
          dispatch({ type: 'TODO_ALREADY_EXISTS' });
        } else {
          await updateDoc(todosRef, {
            todos: arrayUnion(state.todo),
          });
          dispatch({ type: 'ADDING_TODO' });
        }
      } else {
        await setDoc(todosRef, {
          todos: [state.todo],
        });
        dispatch({ type: 'ADDING_TODO' });
      }
      fetchTodos();
    }
  };

  const deleteTodo = async (todoToUpdate: string) => {
    if (currentUser) {
      const todoRef = doc(db, 'todos', currentUser.uid);
      await updateDoc(todoRef, {
        todos: arrayRemove(todoToUpdate),
      });
      dispatch({ type: 'DELETE_TODO' });
    }
    fetchTodos();
  };

  const editTodo = (item: string, index: number) => {
    dispatch({ type: 'EDIT_TODO', payload: { item, index } });
    closeAlert();
  };

  const updateTodo = async (tempList: string[]) => {
    const { currentUser } = auth;
    if (currentUser) {
      const todoRef = doc(db, 'todos', currentUser.uid);
      console.log('state.todo', state.todo);
      await updateDoc(todoRef, {
        todos: tempList,
      });
    }

    dispatch({ type: 'UPDATE_EDIT_TODO' });
  };

  const clearList = async () => {
    if (currentUser) {
      await deleteDoc(doc(db, 'todos', currentUser.uid));
      dispatch({ type: 'CLEARED_LIST' });
    }
  };

  const emptyTodoArray = () => {
    dispatch({ type: 'EMPTY_TODO_ARRAY' });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const closeAlert = () => {
    dispatch({ type: 'CLOSE_ALERT' });
  };

  return (
    <TodolistContext.Provider
      value={{
        state,
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

export function useTodolistContext() {
  const context = useContext(TodolistContext);
  if (context === undefined) {
    throw new Error(
      'useTodolistContext must be used within a TodolistProvider'
    );
  }
  return context;
}
