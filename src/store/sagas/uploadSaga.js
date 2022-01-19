import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import types, { actionSetUploadFileSuccess } from '../types/uploadTypes';
import { getGqlForUpload, getGqlForUploadTracks } from '../../utils/getGqlForUpload';
import { jwtDecode } from '../../utils/jwtDecode';
import { setAvatar, uploadTracks } from '../../api/upload';

function* uploadFileWorker(action) {
  const auth = yield select(state => state.auth.authToken);

  try {
    const response = yield call(getGqlForUpload, action.payload);
    const avatarId = response._id;

    const token = yield call(jwtDecode, auth);
    const userId = token.sub.id;

    const result = yield call(setAvatar, {userId, avatarId});

    // yield put(actionSetUploadFileSuccess());
  } catch (e) {
    e.message;
  }
}

function* uploadTrackWorker(action) {
  try {
    const response = yield call(getGqlForUploadTracks, action.payload);
    const trackId = response._id;

    const result = yield call(uploadTracks, trackId);
    yield put(actionSetUploadFileSuccess(result));
  } catch (e) {
    e.message;
  }
}

export function* uploadSaga() {
  yield takeLatest(types.SET_UPLOAD_FILE, uploadFileWorker);
  yield takeLatest(types.SET_UPLOAD_TRACK, uploadTrackWorker);
}
