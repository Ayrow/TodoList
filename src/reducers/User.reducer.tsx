import { UserState, UserAction } from '../contexts/UserContext';

export const UserReducer = (state: UserState, action: UserAction) => {
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
        newPassword: '',
      };
    case 'PASSWORDS_DONT_MATCH':
      return {
        ...state,
        alert: {
          isOpen: true,
          type: 'Error',
          message: 'Passwords do not match',
          color: 'bg-red-200 border-red-600 text-red-600',
        },
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
    case 'ALERT_UPDATED_ACCOUNT':
      return {
        ...state,
        username: '',
        email: '',
        phoneNumber: '',
        isDeleting: false,
        isUpdatingPassword: false,
        isUpdatingUserInfo: false,
        alert: {
          isOpen: true,
          type: 'success',
          message: 'Your account has been updated',
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
    case 'NOTHING_TO_UPDATE':
      return {
        ...state,
        alert: {
          isOpen: true,
          type: 'Error',
          message: 'You must enter enter new contact details before saving',
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
    case 'MODAL_UPDATE_PASSWORD':
      return {
        ...state,
        isUpdatingPassword: true,
        isDeleting: false,
        isUpdatingUserInfo: false,
      };
    case 'MODAL_DELETE':
      return {
        ...state,
        isDeleting: true,
        isUpdatingPassword: false,
        isUpdatingUserInfo: false,
      };
    case 'MODAL_UPDATE_USER_INFO':
      return {
        ...state,
        isUpdatingPassword: false,
        isDeleting: false,
        isUpdatingUserInfo: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isUpdatingPassword: false,
        isDeleting: false,
        isUpdatingUserInfo: false,
      };
    default:
      return state;
  }
};
