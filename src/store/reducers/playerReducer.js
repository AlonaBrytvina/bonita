import types from '../types/playerTypes';
import { BACKEND_URL } from '../../constants';

const initialState = {
  trackList: [],
  isPlaying: false,
  duration: 0,
  audio: null,
  currentPlayingTrackId: null,
};

export function playerReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PLAYER_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
