import {
  call, put, takeLatest, select, all,
} from 'redux-saga/effects';
import types, {
  actionLoginSuccess,
  actionRegisterSuccess,
  actionLoginFail,
  actionRegisterFail,
  actionLogin,
  actionFindUserByIdSuccess,
  actionSetUser, actionSetNickSuccess,
} from '../types/authTypes';
import {
  findUserById, login, registration, setNick,
} from '../../api/auth';
import { forwardToPage } from '../../utils/history';
import { jwtDecode } from '../../utils/jwtDecode';
import { actionSetSnackBar } from '../types/snackBarTypes';
import { ROUTES, ALERT_TYPES } from '../../constants';

function* loginWorker(action) {
  try {
    localStorage.removeItem('authToken');
    const authToken = yield call(login, action.payload);

    if (authToken === null) {
      yield put(actionSetSnackBar({type: ALERT_TYPES.ERROR, message: 'The login or password isn\'t correct! '}));
    } else {
      localStorage.setItem('authToken', authToken);
      yield put(actionLoginSuccess({authToken, login: action.payload.login}));
      const token = yield call(jwtDecode, authToken);
      const {id} = token.sub;

      const user = yield call(findUserById, id);

      yield put(actionFindUserByIdSuccess(user));
      yield put(actionSetUser(user));

      yield call(forwardToPage, ROUTES.MAIN_PAGE);
      if (user._id.length !== 0) {
        yield put(actionSetSnackBar({type: ALERT_TYPES.SUCCESS, message: 'Success!'}));
      }
    }
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
      yield put(actionLogin({login: userData.login, password: action.payload.password}));
    }
  } catch (e) {
    yield put(actionRegisterFail(e.message));
  }
}

function* findUserWorker(action) {
  const user = yield call(findUserById, action.payload);
  yield put(actionFindUserByIdSuccess(user));
}

function* setNickWorker(action) {
  const userId = yield select(state => state.auth.user._id);
  const response = yield call(setNick, {id: userId, nick: action.payload});

  yield put(actionSetNickSuccess(response));
  yield put(actionSetUser(response));
}

function* logOutWorker(action) {
  yield put(actionSetUser(action.payload));
  yield put(actionLoginSuccess({...action.payload}));
}

export function* authSaga() {
  yield takeLatest(types.FETCH_LOGIN, loginWorker);
  yield takeLatest(types.FETCH_REGISTER, registerWorker);
  yield takeLatest(types.FETCH_FIND_USER_BY_ID, findUserWorker);
  yield takeLatest(types.SET_NICK, setNickWorker);
  yield takeLatest(types.LOG_OUT, logOutWorker);
}
