export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};
