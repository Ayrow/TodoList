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
