import {
  all,
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import types, {
} from '../types/uploadTypes';
import { getGqlForUpload } from '../../utils/getGqlForUpload';
import { jwtDecode } from '../../utils/jwtDecode';
import { setAvatar, uploadTracks } from '../../api/upload';
import { actionSetUser } from '../types/authTypes';
import { actionSetSnackBar } from '../types/snackBarTypes';
import { ALERT_TYPES } from '../reducers/snackBarReducer';
import { forwardToPage } from '../../utils/history';
import { ROUTES } from '../../constants';

function* uploadFileWorker(action) {
  const auth = yield select(state => state.auth.authToken);

  const response = yield call(getGqlForUpload, {data: action.payload, formName: 'photo', fetchPart: 'upload'});
  const avatarId = response._id;

  const token = yield call(jwtDecode, auth);
  const userId = token.sub.id;
  const result = yield call(setAvatar, {userId, avatarId});

  yield put(actionSetUser(result));
}

function* uploadTrackWorker(action) {
  const tracks = yield all(action.payload.map(file => {
    const formData = new FormData();
    formData.append('track', file);
    return call(getGqlForUpload, {formData, fetchPart: 'track'});
  }));

  const getTracks = yield all(tracks.map(track => call(uploadTracks, track._id)));
  if (getTracks.length !== 0) {
    yield call(forwardToPage, ROUTES.MAIN_PAGE);
    yield put(actionSetSnackBar({type: ALERT_TYPES.SUCCESS, message: 'Success!'}));
  }
}

export function* uploadSaga() {
  yield takeLatest(types.SET_UPLOAD_FILE, uploadFileWorker);
  yield takeLatest(types.SET_UPLOAD_TRACK, uploadTrackWorker);
}
