const types = {
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
  SET_AUDIO: 'SET_AUDIO',
  SET_CURRENT_TRACK_ID: 'SET_CURRENT_TRACK_ID',
  SET_PLAYER_STATE: 'SET_PLAYER_STATE',
  PREVIOUS_TRACK: 'PREVIOUS_TRACK',
  NEXT_TRACK: 'NEXT_TRACK',
  CHANGE_TIME: 'CHANGE_TIME',
};

export const actionPause = (payload) => ({type: types.PAUSE, payload});
export const actionPlay = (payload) => ({type: types.PLAY, payload});
export const actionSetPlayerState = (payload) => ({type: types.SET_PLAYER_STATE, payload});

export const actionPreviousTrack = (payload) => ({type: types.PREVIOUS_TRACK, payload});
export const actionNextTrack = (payload) => ({type: types.NEXT_TRACK, payload});
export const actionChangeTime = (payload) => ({type: types.CHANGE_TIME, payload});

export default types;
