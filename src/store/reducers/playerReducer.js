import types from '../types/playerTypes';

const initialState = {
  trackList: [],
  isPlaying: false,
  duration: 0,
  currentTime: 0,
  audio: null,
  currentPlayingTrackId: null,
};

export function playerReducer(state = initialState, action) {
  switch (action.type) {
    case types.PLAY:
      const trackPlay = action.payload.trackList.find(track => track._id === action.payload.id);
      return {
        ...state,
        isPlaying: true,
        trackList: action.payload.trackList,
        currentPlayingTrackId: trackPlay._id,
      };
    case types.PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    case types.SET_AUDIO:
      return {
        ...state,
        audio: action.payload,
      };
    case types.SET_CURRENT_TRACK_ID:
      return {
        ...state,
        currentPlayingTrackId: action.payload,
      };
    default:
      return state;
  }
}
