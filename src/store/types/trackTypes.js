const types = {
  FETCH_TRACKS: 'FETCH_TRACKS',
  FETCH_TRACKS_SUCCESS: 'FETCH_TRACKS_SUCCESS',
  FETCH_TRACKS_FAIL: 'FETCH_TRACKS_FAIL',
  FETCH_USER_TRACKS: 'FETCH_USER_TRACKS',
  FETCH_USER_TRACKS_SUCCESS: 'FETCH_USER_TRACKS_SUCCESS',
};

export const actionFetchTracks = (payload) => ({type: types.FETCH_TRACKS, payload});
export const actionFetchTracksSuccess = (payload) => ({type: types.FETCH_TRACKS_SUCCESS, payload});
export const actionFetchTracksFail = (payload) => ({type: types.FETCH_TRACKS_FAIL, payload});

export const actionFetchUserTracks = (payload) => ({type: types.FETCH_USER_TRACKS, payload});
export const actionFetchUserTracksSuccess = (payload) => ({type: types.FETCH_USER_TRACKS_SUCCESS, payload});

export default types;
