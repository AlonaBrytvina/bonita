import {
  all,
  call, put, select, takeLatest,
} from 'redux-saga/effects';

import {
  getSelectedPlaylist,
  getPlaylistsWithPage,
  getPlaylistsCount,
  createPlaylist,
  addTracksToPlaylist,
  getUserPlaylist,
  getUserPlaylistsCount,
} from '../../api/playlists';
import types, {
  actionFetchOnePlaylistSuccess,
  actionFetchPlaylistsFail,
  actionFetchPlaylistsSuccess,
  actionFetchOnePlaylistFail, actionFetchUserPlaylistsSuccess,
} from '../types/playlistTypes';
import { getGqlForUpload } from '../../utils/getGqlForUpload';
import { uploadTracks } from '../../api/upload';
import { actionSetSnackBar } from '../types/snackBarTypes';
import { forwardToPage } from '../../utils/history';
import { ROUTES, ALERT_TYPES} from '../../constants';

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
  const {playlistName, files} = action.payload;
  const arrayId = [];

  const playlistId = yield call(createPlaylist, playlistName);

  const tracks = yield all(files.map(file => {
    const formData = new FormData();
    formData.append('track', file);
    return call(getGqlForUpload, {formData, fetchPart: 'track'});
  }));

  const allTracks = yield all(tracks.map(track => call(uploadTracks, track._id)));

  allTracks.map(track => arrayId.push({ _id: track._id }));

  const getPlaylistWithTracks = yield call(addTracksToPlaylist, {
    playlistId: playlistId._id,
    arrayOfTracks: arrayId,
  });

  if (Object.keys(getPlaylistWithTracks).length !== 0) {
    yield put(actionSetSnackBar({type: ALERT_TYPES.SUCCESS, message: 'Success!'}));
    yield call(forwardToPage, ROUTES.PLAYLISTS_PAGE);
  }
}

function* fetchUserPlaylistsWorker(action) {
  const page = action.payload;
  const userId = yield select(state => state?.auth?.user?._id);

  const playlistsCount = yield call(getUserPlaylistsCount, userId);

  if (userId.length !== 0) {
    const userPlaylists = yield call(getUserPlaylist, {userId, page});
    yield put(actionFetchUserPlaylistsSuccess({userPlaylists, totalCount: playlistsCount}));
  }
}

export function* playlistsSaga() {
  yield takeLatest(types.FETCH_PLAYLISTS, getAllPlaylists);
  yield takeLatest(types.FETCH_ONE_PLAYLIST, getOnePlaylist);
  yield takeLatest(types.CREATE_PLAYLIST, createUserPlaylistWorker);
  yield takeLatest(types.FETCH_USER_PLAYLISTS, fetchUserPlaylistsWorker);
}
