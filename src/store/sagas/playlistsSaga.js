import {
  call, put, takeLatest,
} from 'redux-saga/effects';

import {
  getSelectedPlaylist, getPlaylistsWithPage, getPlaylistsCount,
} from '../../api/playlists';
import types, {
  actionFetchOnePlaylistSuccess,
  actionFetchPlaylistsFail,
  actionFetchPlaylistsSuccess,
  actionFetchOnePlaylistFail,
} from '../types/playlistTypes';
import { getTracksCount } from '../../api/tracks';
import { actionFetchTracksSuccess } from '../types/trackTypes';

function* getAllPlaylists(action) {
  try {
    const playlistsCount = yield call(getPlaylistsCount);
    const page = action.payload;
    const playlists = yield call(getPlaylistsWithPage, page);
    yield put(actionFetchPlaylistsSuccess({playlists, playlistsCount}));
  } catch (e) {
    yield put(actionFetchPlaylistsFail());
  }
}

function* getOnePlaylist(action) {
  try {
    const selectedPlaylist = yield call(getSelectedPlaylist, action.payload);
    yield put(actionFetchOnePlaylistSuccess(selectedPlaylist));
  } catch (e) {
    yield put(actionFetchOnePlaylistFail());
  }
}

function* setQueTracksWorker(action) {
  console.log(action.payload);
  yield put(actionFetchOnePlaylistSuccess(action.payload));
}

export function* playlistsSaga() {
  yield takeLatest(types.FETCH_PLAYLISTS, getAllPlaylists);
  yield takeLatest(types.FETCH_ONE_PLAYLIST, getOnePlaylist);
  yield takeLatest(types.SET_QUE_TRACKS, setQueTracksWorker);
}
