import types from '../types/trackTypes';

const initialState = {
  trackList: [],
  totalCount: 0,
  isLoading: false,
  userTracks: [],
};

export function tracksReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TRACKS:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_TRACKS_SUCCESS:
      return {
        ...state,
        trackList: action.payload.trackList,
        totalCount: action.payload.totalCount,
        isLoading: false,
      };
    case types.FETCH_USER_TRACKS:
      return {
        ...state,
      };
    case types.FETCH_USER_TRACKS_SUCCESS:
      return {
        ...state,
        myTracks: action.payload,
      };
    default:
      return state;
  }
}
