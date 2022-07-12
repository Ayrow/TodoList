export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case 'EMPTY_FORMS':
      return {
        ...state,
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    case 'SET_NEW_PASSWORD':
      return {
        ...state,
        newPassword: action.payload,
      };
    case 'UPDATED_PASSWORD':
      return {
        ...state,
        newPassword: '',
      };
    default:
      return state;
  }
};
