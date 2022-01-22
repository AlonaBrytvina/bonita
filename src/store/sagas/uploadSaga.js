import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import types, {
  actionSetUploadTrackSuccess,
} from '../types/uploadTypes';
import { getGqlForUpload, getGqlForUploadTracks } from '../../utils/getGqlForUpload';
import { jwtDecode } from '../../utils/jwtDecode';
import { setAvatar } from '../../api/upload';
import { actionSetUser } from '../types/authTypes';

function* uploadFileWorker(action) {
  const auth = yield select(state => state.auth.authToken);

  try {
    const response = yield call(getGqlForUpload, action.payload);
    const avatarId = response._id;

    const token = yield call(jwtDecode, auth);
    const userId = token.sub.id;

    const result = yield call(setAvatar, {userId, avatarId});
    yield put(actionSetUser(result));
  } catch (e) {
    e.message;
  }
}

function* uploadTrackWorker(action) {
  try {
    const response = yield call(getGqlForUploadTracks, action.payload);
    const trackId = response._id;
    console.log(response);

    yield put(actionSetUploadTrackSuccess({...response, originalFileName: action.payload.name}));

    // const result = yield call(uploadTracks, trackId);
    // console.log(result);
  } catch (e) {
    e.message;
  }
}

export function* uploadSaga() {
  yield takeLatest(types.SET_UPLOAD_FILE, uploadFileWorker);
  yield takeLatest(types.SET_UPLOAD_TRACK, uploadTrackWorker);
}
