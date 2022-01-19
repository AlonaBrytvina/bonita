const types = {
  FETCH_PLAYLISTS: 'FETCH_PLAYLISTS',
  FETCH_PLAYLISTS_SUCCESS: 'FETCH_PLAYLISTS_SUCCESS',
  FETCH_PLAYLISTS_FAIL: 'FETCH_PLAYLISTS_FAIL',
  FETCH_ONE_PLAYLIST: 'FETCH_ONE_PLAYLIST',
  FETCH_ONE_PLAYLIST_SUCCESS: 'FETCH_ONE_PLAYLIST_SUCCESS',
  FETCH_ONE_PLAYLIST_FAIL: 'FETCH_ONE_PLAYLIST_FAIL',
};

export const actionFetchPlaylists = (payload) => ({type: types.FETCH_PLAYLISTS, payload});
export const actionFetchPlaylistsSuccess = (payload) => ({type: types.FETCH_PLAYLISTS_SUCCESS, payload});
export const actionFetchPlaylistsFail = (payload) => ({type: types.FETCH_PLAYLISTS_FAIL, payload});

export const actionFetchOnePlaylist = (payload) => ({type: types.FETCH_ONE_PLAYLIST, payload});
export const actionFetchOnePlaylistSuccess = (payload) => ({type: types.FETCH_ONE_PLAYLIST_SUCCESS, payload});
export const actionFetchOnePlaylistFail = (payload) => ({type: types.FETCH_ONE_PLAYLIST_FAIL, payload});

export default types;
