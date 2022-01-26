import {
  put, takeLatest, select,
} from 'redux-saga/effects';
import types, { actionPlay, actionSetPlayerState } from '../types/playerTypes';
import store from '../store';

function* playWorker(action) {
  const {trackList, id} = action.payload;
  const {url} = trackList.find(track => track._id === id);
  const state = yield select(state => state.player);

  if (id !== state.currentPlayingTrackId) {
    if (state.audio !== null) {
      state.audio.pause();
      yield put(actionSetPlayerState({
        duration: 0,
      }));
    }
  } else {
    state.audio.play();
    yield put(actionSetPlayerState({
      isPlaying: true,
    }));
    return;
  }

  const audio = new Audio(url);
  audio.addEventListener('durationchange', (e) => {
    store.dispatch(actionSetPlayerState({duration: e.target.duration}));
  });

  audio.play();

  yield put(actionSetPlayerState({
    trackList,
    currentPlayingTrackId: id,
    audio,
    isPlaying: true,
  }));
}

function* pauseWorker(action) {
  const audio = yield select(state => state.player.audio);
  audio.pause();
  yield put(actionSetPlayerState({
    isPlaying: false,
  }));
}

function* previousTrackWorker(action) {
  const state = yield select(state => state.player);
  const {audio, trackList, currentPlayingTrackId} = state;
  const trackIndex = trackList.findIndex(track => track._id === currentPlayingTrackId);

  const previousTrack = trackIndex === 0
    ? trackList.find((track, index) => index === trackList.length - 1)
    : trackList.find((track, index) => index === trackIndex - 1);

  audio.pause();

  yield put(actionPlay({
    trackList, id: previousTrack._id,
  }));
}

function* nextTrackWorker(action) {
  const state = yield select(state => state.player);
  const {audio, trackList, currentPlayingTrackId} = state;
  const trackIndex = trackList.findIndex(track => track._id === currentPlayingTrackId);

  const nextTrack = trackIndex === trackList.length - 1
    ? trackList.find((track, index) => index === 0)
    : trackList.find((track, index) => index === trackIndex + 1);

  audio.pause();

  yield put(actionPlay({
    trackList, id: nextTrack._id,
  }));
}

function* changeTrackWorker(action) {
  const audio = yield select(state => state.player.audio);
  audio.currentTime = action.payload;
}

export function* playerSaga() {
  yield takeLatest(types.PLAY, playWorker);
  yield takeLatest(types.PAUSE, pauseWorker);
  yield takeLatest(types.PREVIOUS_TRACK, previousTrackWorker);
  yield takeLatest(types.NEXT_TRACK, nextTrackWorker);
  yield takeLatest(types.CHANGE_TIME, changeTrackWorker);
}
