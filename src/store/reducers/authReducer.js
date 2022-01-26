import types from '../types/authTypes';

const initialState = {
  login: '',
  authToken: localStorage.getItem('authToken') ?? null,
  user: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        login: action.payload.login,
        authToken: action.payload.authToken,
      };
    case types.FETCH_LOGIN_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.FETCH_REGISTER_SUCCESS:
      return {
        ...state,
        login: action.payload.login,
        authToken: action.payload.authToken,
      };
    case types.FETCH_REGISTER_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case types.FETCH_FIND_USER_BY_ID_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.SET_NICK_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
