import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import types, {
  actionLoginSuccess,
  actionRegisterSuccess,
  actionLoginFail,
  actionRegisterFail,
  actionLogin,
  actionFindUserByIdSuccess,
  actionFindUserByIdFail, actionSetUser,
} from '../types/authTypes';
import { findUserById, login, registration } from '../../api/auth';
import { forwardToMainPage } from '../../utils/history';
import { jwtDecode } from '../../utils/jwtDecode';

function* loginWorker(action) {
  const auth = yield select(state => state.auth.authToken);
  try {
    localStorage.removeItem('authToken');
    const authToken = yield call(login, action.payload);
    localStorage.setItem('authToken', authToken);
    yield put(actionLoginSuccess({authToken, login: action.payload.login}));
    const token = yield call(jwtDecode, auth);
    const {id} = token.sub;

    const user = yield call(findUserById, id);

    yield put(actionFindUserByIdSuccess(user));
    yield put(actionSetUser(user));

    yield call(forwardToMainPage, '/');
  } catch (e) {
    yield put(actionLoginFail(e.message));
  }
}

function* registerWorker(action) {
  try {
    localStorage.removeItem('authToken');
    const userData = yield call(registration, action.payload);
    yield put(actionRegisterSuccess({authToken: null, login: userData.login}));
    if (userData._id.length !== 0) {
      yield call(loginWorker, actionLogin({login: action.payload.login, password: action.payload.password}));
    }
  } catch (e) {
    yield put(actionRegisterFail(e.message));
  }
}

function* findUserWorker(action) {
  console.log(action.payload);
  const auth = yield select(state => state.auth);
  try {
    const user = yield call(findUserById, action.payload);
    console.log(action.payload, auth);
    yield put(actionFindUserByIdSuccess(user));
  } catch (e) {
    yield put(actionFindUserByIdFail());
  }
}

export function* authSaga() {
  yield takeLatest(types.FETCH_LOGIN, loginWorker);
  yield takeLatest(types.FETCH_REGISTER, registerWorker);
  yield takeLatest(types.FETCH_FIND_USER_BY_ID, findUserWorker);
}
