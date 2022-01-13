const types = {
  FETCH_LOGIN_SUCCESS: 'FETCH_LOGIN_SUCCESS',
  FETCH_LOGIN_FAIL: 'FETCH_REGISTER_FAIL',
  FETCH_REGISTER_SUCCESS: 'FETCH_LOGIN_SUCCESS',
  FETCH_REGISTER_FAIL: 'FETCH_REGISTER_FAIL',
  FETCH_LOGIN: 'FETCH_LOGIN',
  FETCH_REGISTER: 'FETCH_REGISTER',
};

export const actionLogin = (payload) => ({type: types.FETCH_LOGIN, payload});
export const actionLoginSuccess = (payload) => ({type: types.FETCH_LOGIN_SUCCESS, payload});
export const actionLoginFail = (payload) => ({type: types.FETCH_LOGIN_FAIL, payload});
export const actionRegister = (payload) => ({type: types.FETCH_REGISTER, payload});
export const actionRegisterSuccess = (payload) => ({type: types.FETCH_REGISTER_SUCCESS, payload});
export const actionRegisterFail = (payload) => ({type: types.FETCH_REGISTER_FAIL, payload});

export default types;
