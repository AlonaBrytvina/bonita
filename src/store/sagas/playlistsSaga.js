import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import {
  getSelectedPlaylist, getPlaylistsWithPage, getPlaylistsCount, createPlaylist, addTracksToPlaylist, getUserPlaylist,
} from '../../api/playlists';
import types, {
  actionFetchOnePlaylistSuccess,
  actionFetchPlaylistsFail,
  actionFetchPlaylistsSuccess,
  actionFetchOnePlaylistFail, actionCreatePlaylistByIdSuccess, actionFetchUserPlaylistsSuccess,
} from '../types/playlistTypes';
import { getUserTracks } from '../../api/tracks';
import { actionFetchUserTracksSuccess } from '../types/trackTypes';

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

function* createUserPlaylistWorker(action) {
  console.log(action.payload);
  const {playlistName} = action.payload;
  const uploadTracks = yield select(state => state.upload.tracks);

  try {
    const playlistId = yield call(createPlaylist, playlistName);

    console.log(playlistId._id, action.payload.uploadTracks);
    const getPlaylist = yield call(addTracksToPlaylist, {playlistId: playlistId._id, arrayOfTracks: uploadTracks});
    console.log(getPlaylist);

    const userPlaylist = yield call(getSelectedPlaylist, playlistId._id);
    yield put(actionCreatePlaylistByIdSuccess(userPlaylist));
    console.log(userPlaylist);
  } catch (e) {
    e.message;
  }
}

function* fetchUserPlaylistsWorker(action) {
  const page = action.payload;
  const userId = yield select(state => state?.auth?.user?._id);
  const userPlaylists = yield call(getUserPlaylist, {userId, page});

  yield put(actionFetchUserPlaylistsSuccess({userPlaylists, totalCount: userPlaylists.length}));
}

export function* playlistsSaga() {
  yield takeLatest(types.FETCH_PLAYLISTS, getAllPlaylists);
  yield takeLatest(types.FETCH_ONE_PLAYLIST, getOnePlaylist);
  yield takeLatest(types.CREATE_PLAYLIST, createUserPlaylistWorker);
  yield takeLatest(types.FETCH_USER_PLAYLISTS, fetchUserPlaylistsWorker);
}
