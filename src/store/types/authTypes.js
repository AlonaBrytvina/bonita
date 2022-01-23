const types = {
  FETCH_LOGIN_SUCCESS: 'FETCH_LOGIN_SUCCESS',
  FETCH_LOGIN_FAIL: 'FETCH_REGISTER_FAIL',
  FETCH_REGISTER_SUCCESS: 'FETCH_LOGIN_SUCCESS',
  FETCH_REGISTER_FAIL: 'FETCH_REGISTER_FAIL',
  FETCH_LOGIN: 'FETCH_LOGIN',
  FETCH_REGISTER: 'FETCH_REGISTER',
  FETCH_FIND_USER_BY_ID: 'FETCH_FIND_USER_BY_ID',
  FETCH_FIND_USER_BY_ID_SUCCESS: 'FETCH_FIND_USER_BY_ID_SUCCESS',
  FETCH_FIND_USER_BY_ID_FAIL: 'FETCH_FIND_USER_BY_ID_FAIL',
  SET_USER: 'SET_USER',
  SET_NICK: 'SET_NICK',
  SET_NICK_SUCCESS: 'SET_NICK_SUCCESS',
  LOG_OUT: 'LOG_OUT',
};

export const actionLogin = (payload) => ({type: types.FETCH_LOGIN, payload});
export const actionLoginSuccess = (payload) => ({type: types.FETCH_LOGIN_SUCCESS, payload});
export const actionLoginFail = (payload) => ({type: types.FETCH_LOGIN_FAIL, payload});

export const actionRegister = (payload) => ({type: types.FETCH_REGISTER, payload});
export const actionRegisterSuccess = (payload) => ({type: types.FETCH_REGISTER_SUCCESS, payload});
export const actionRegisterFail = (payload) => ({type: types.FETCH_REGISTER_FAIL, payload});

export const actionFindUserById = (payload) => ({type: types.FETCH_FIND_USER_BY_ID, payload});
export const actionFindUserByIdSuccess = (payload) => ({type: types.FETCH_FIND_USER_BY_ID_SUCCESS, payload});
export const actionFindUserByIdFail = (payload) => ({type: types.FETCH_FIND_USER_BY_ID_FAIL, payload});

export const actionSetUser = (payload) => ({type: types.SET_USER, payload});
export const actionSetNick = (payload) => ({type: types.SET_NICK, payload});
export const actionSetNickSuccess = (payload) => ({type: types.SET_NICK_SUCCESS, payload});

export const actionLogOut = (payload) => ({type: types.LOG_OUT, payload});

export default types;
