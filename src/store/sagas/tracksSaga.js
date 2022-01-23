import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import types, {
  actionFetchUserTracksSuccess,
  actionFetchTracksFail,
  actionFetchTracksSuccess,
} from '../types/trackTypes';
import {
  getTracksCount, getTracksWithPage, getUserTracks, getUserTracksCount,
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
  const page = action.payload;
  const userId = yield select(state => state?.auth?.user?._id);

  const userTracks = yield call(getUserTracks, {userId, page});
  const userTracksCount = yield call(getUserTracksCount, userId);

  yield put(actionFetchUserTracksSuccess({userTracks, totalCount: userTracksCount}));
}

export function* tracksSaga() {
  yield takeLatest(types.FETCH_TRACKS, fetchTracksWorker);
  yield takeLatest(types.FETCH_USER_TRACKS, fetchUserTracksWorker);
}
