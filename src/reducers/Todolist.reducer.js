export const TodolistReducer = (state, action) => {
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
      };
    case 'EDIT_TODO':
      return {
        ...state,
        editID: action.payload.index,
        todoToUpdate: action.payload.item,
        isModalOpen: true,
        isEditing: true,
      };
    case 'UPDATE_ARRAY':
      return {
        ...state,
        todoArray: action.payload,
      };
    case 'UPDATE_EDIT_TODO':
      return {
        ...state,
        isEditing: false,
        isModalOpen: false,
        todo: '',
        todoToUpdate: '',
        editID: null,
      };
    default:
      return state;
  }
};
