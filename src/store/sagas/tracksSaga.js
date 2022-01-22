import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import types, {
  actionFetchUserTracksSuccess,
  actionFetchTracksFail,
  actionFetchTracksSuccess,
} from '../types/trackTypes';
import {
  getTracksCount, getTracksWithPage, getUserTracks,
} from '../../api/tracks';

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

function* fetchUserTracksWorker(action) {
  const userId = yield select(state => state?.auth?.user?._id);
  const userTracks = yield call(getUserTracks, userId);

  yield put(actionFetchUserTracksSuccess({userTracks, totalCount: userTracks.length}));
}

export function* tracksSaga() {
  yield takeLatest(types.FETCH_TRACKS, fetchTracksWorker);
  yield takeLatest(types.FETCH_USER_TRACKS, fetchUserTracksWorker);
}
