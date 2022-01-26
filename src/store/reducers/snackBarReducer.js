import types from '../types/snackBarTypes';

export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

const initialState = {
  isOpen: false,
  type: '',
  message: '',
};

export function snackBarReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SNACK_BAR:
      return {
        ...state,
        isOpen: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    case types.RESET_SNACK_BAR:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}
