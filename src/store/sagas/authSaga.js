import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import types, {
  actionLoginSuccess,
  actionRegisterSuccess,
  actionLoginFail,
  actionRegisterFail,
} from '../types/authTypes';
import { login } from '../../api/auth';

function* loginWorker(action) {
  try {
    const authToken = yield call(login, action.payload);
    localStorage.setItem('authToken', authToken);
    yield put(actionLoginSuccess({authToken, login: action.payload.login}));
  } catch (e) {
    yield put(actionLoginFail(e.message));
  }
}

export function* authSaga() {
  yield takeLatest(types.FETCH_LOGIN, loginWorker);
}
