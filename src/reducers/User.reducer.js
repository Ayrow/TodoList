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
    case 'UPDATED_PASSWORD':
      return {
        ...state,
        newPassword: '',
        password: '',
        alert: {
          isOpen: true,
          type: 'success',
          message: 'Your password has been updated',
          color: 'bg-green-200 border-green-600 text-green-600',
        },
      };
    case 'PASSWORD_ALREADY_USED':
      return {
        ...state,
        alert: {
          isOpen: true,
          type: 'Error',
          message: 'Please enter a different password',
          color: 'bg-red-200 border-red-600 text-red-600',
        },
      };
    case 'MISSING_NEW_PASSWORD':
      return {
        ...state,
        alert: {
          isOpen: true,
          type: 'Error',
          message: 'Please enter a new password',
          color: 'bg-red-200 border-red-600 text-red-600',
        },
      };
    case 'CLOSE_ALERT':
      return {
        ...state,
        alert: {
          ...alert,
          isOpen: false,
        },
      };
    default:
      return state;
  }
};
