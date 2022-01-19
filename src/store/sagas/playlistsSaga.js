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

export function* playlistsSaga() {
  yield takeLatest(types.FETCH_PLAYLISTS, getAllPlaylists);
  yield takeLatest(types.FETCH_ONE_PLAYLIST, getOnePlaylist);
}
