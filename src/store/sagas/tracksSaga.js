import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import types, { actionFetchTracksFail, actionFetchTracksSuccess } from '../types/trackTypes';
import { getTracksCount, getTracksWithPage } from '../../api/tracks';

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

export function* tracksSaga() {
  yield takeLatest(types.FETCH_TRACKS, fetchTracksWorker);
}
