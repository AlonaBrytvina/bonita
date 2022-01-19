const types = {
  SET_UPLOAD_FILE: 'SET_UPLOAD_FILE',
  SET_UPLOAD_FILE_SUCCESS: 'SET_UPLOAD_FILE_SUCCESS',
  SET_UPLOAD_TRACK: 'SET_UPLOAD_TRACK',
};

export const actionSetUploadFile = (payload) => ({type: types.SET_UPLOAD_FILE, payload});
export const actionSetUploadFileSuccess = (payload) => ({type: types.SET_UPLOAD_FILE_SUCCESS, payload});
export const actionSetUploadTrack = (payload) => ({type: types.SET_UPLOAD_TRACK, payload});

export default types;
