import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import types, {
  actionFetchUserTracksSuccess,
  actionFetchTracksFail,
  actionFetchTracksSuccess,
} from '../types/trackTypes';
import { getMyTracks, getTracksCount, getTracksWithPage } from '../../api/tracks';

function* fetchTracksWorker(action) {
  try {
    const page = action.payload;
    const totalCount = yield call(getTracksCount);
    const trackList = yield call(getTracksWithPage, page);
    yield put(actionFetchTracksSuccess({totalCount, trackList}));
  } catch (e) {
    yield put(actionFetchTracksFail());
  }
}

function* fetchMyTracksWorker(action) {
  const userId = yield select(state => state.auth.user._id);
  console.log(action.payload, userId);
  const myTracks = yield call(getMyTracks, userId);
  console.log(myTracks);
  yield put(actionFetchUserTracksSuccess(myTracks));
}

export function* tracksSaga() {
  yield takeLatest(types.FETCH_TRACKS, fetchTracksWorker);
  yield takeLatest(types.FETCH_USER_TRACKS, fetchMyTracksWorker);
}
