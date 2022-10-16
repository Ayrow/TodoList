import { IInitialStateType, TodolistAction } from '../contexts/TodolistContext';

export const TodolistReducer = (
  state: IInitialStateType,
  action: TodolistAction
): IInitialStateType => {
  switch (action.type) {
    case 'FETCH_TODOS':
      return {
        ...state,
        todoArray: action.payload,
      };
    case 'MISSING_TODO':
      return {
        ...state,
        alert: {
          ...alert,
          open: true,
          message: 'please add a todo',
          type: 'bg-red-500 text-white',
        },
      };
    case 'SET_TODO':
      return {
        ...state,
        todo: action.payload,
      };
    case 'ADDING_TODO':
      return {
        ...state,
        todo: '',
        alert: {
          ...alert,
          open: true,
          message: 'Success! The todo has been added to the list',
          type: 'bg-green-500 text-white',
        },
      };
    case 'CONFIRM_DELETE':
      return {
        ...state,
        isModalOpen: true,
        todoToUpdate: action.payload,
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todo: '',
        todoToUpdate: '',
        isModalOpen: false,
        alert: {
          ...alert,
          open: true,
          message: 'Success! The Todo has been deleted',
          type: 'bg-green-500 text-white',
        },
      };
    case 'EDIT_TODO':
      return {
        ...state,
        editID: action.payload.index,
        todoToUpdate: action.payload.item,
        isModalOpen: true,
        isEditing: true,
      };
    case 'MISSING_NEW_TODO':
      return {
        ...state,
        isModalOpen: false,
        isEditing: false,
        alert: {
          ...alert,
          open: true,
          message: 'Error! TPlease enter a new todo',
          type: 'bg-red-500 text-white',
        },
      };
    case 'UPDATE_EDIT_TODO':
      return {
        ...state,
        isEditing: false,
        isModalOpen: false,
        todo: '',
        todoToUpdate: '',
        editID: null,
        alert: {
          ...alert,
          open: true,
          message: 'Success! The todo has been changed',
          type: 'bg-green-500 text-white',
        },
      };
    case 'CLEARED_LIST':
      return {
        ...state,
        isEditing: false,
        isModalOpen: false,
        todo: '',
        todoToUpdate: '',
        editID: null,
        // tempArray: [],
        todoArray: [],
        alert: {
          ...alert,
          open: true,
          message: 'Success! The List has been cleared',
          type: 'bg-red-500 text-white',
        },
      };
    case 'EMPTY_TODO_ARRAY':
      return {
        ...state,
        todo: '',
        todoToUpdate: '',
        editID: null,
        todoArray: [],
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        isEditing: false,
      };
    default:
      return state;
  }
};
