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
      console.log(action.payload);
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};
