const types = {
  PAUSE: 'PAUSE',
  PLAY: 'PLAY',
  SET_AUDIO: 'SET_AUDIO',
  SET_CURRENT_TRACK_ID: 'SET_CURRENT_TRACK_ID',
  SET_UPLOAD_FILE: 'SET_UPLOAD_FILE',
};

export const actionPause = (payload) => ({type: types.PAUSE, payload});
export const actionPlay = (payload) => ({type: types.PLAY, payload});
export const actionSetAudio = (payload) => ({type: types.SET_AUDIO, payload});
export const actionSetCurrentTrackId = (payload) => ({type: types.SET_CURRENT_TRACK_ID, payload});
export const actionUploadFile = (payload) => ({type: types.SET_UPLOAD_FILE, payload});

export default types;
