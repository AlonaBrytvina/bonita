import types from '../types/snackBarTypes';

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
