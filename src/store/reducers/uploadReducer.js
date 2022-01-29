import types from '../types/uploadTypes';

const initialState = {
  file: [],
  tracks: [],
};

export function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        file: action.payload,
      };
    case types.SET_UPLOAD_TRACK_SUCCESS:
      return {
        ...state,
        tracks: action.payload,
      };
    case types.UPSERT_USER_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.payload,
      };
    default:
      return state;
  }
}
