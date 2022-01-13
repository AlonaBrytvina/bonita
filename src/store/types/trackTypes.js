const types = {
  FETCH_TRACKS: 'FETCH_TRACKS',
  FETCH_TRACKS_SUCCESS: 'FETCH_TRACKS_SUCCESS',
  FETCH_TRACKS_FAIL: 'FETCH_TRACKS_FAIL',
};

export const actionFetchTracks = (payload) => ({type: types.FETCH_TRACKS, payload});
export const actionFetchTracksSuccess = (payload) => ({type: types.FETCH_TRACKS_SUCCESS, payload});
export const actionFetchTracksFail = (payload) => ({type: types.FETCH_TRACKS_FAIL, payload});

export default types;
