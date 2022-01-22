const types = {
  SET_UPLOAD_FILE: 'SET_UPLOAD_FILE',
  SET_UPLOAD_FILE_SUCCESS: 'SET_UPLOAD_FILE_SUCCESS',
  SET_UPLOAD_TRACK: 'SET_UPLOAD_TRACK',
  SET_UPLOAD_TRACK_SUCCESS: 'SET_UPLOAD_TRACK_SUCCESS',
};

export const actionSetUploadFile = (payload) => ({type: types.SET_UPLOAD_FILE, payload});
export const actionSetUploadFileSuccess = (payload) => ({type: types.SET_UPLOAD_FILE_SUCCESS, payload});

export const actionSetUploadTrack = (payload) => ({type: types.SET_UPLOAD_TRACK, payload});
export const actionSetUploadTrackSuccess = (payload) => ({type: types.SET_UPLOAD_TRACK_SUCCESS, payload});

export default types;
