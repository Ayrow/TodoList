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
    case 'DELETE_TODO':
      return {
        ...state,
        todo: '',
      };
    case 'EDIT_TODO':
      return {
        ...state,
        editID: action.payload.index,
        todo: action.payload.item,
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
        todo: '',
        editID: null,
      };
    default:
      return state;
  }
};
