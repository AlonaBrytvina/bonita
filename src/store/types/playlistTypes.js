const types = {
  FETCH_PLAYLISTS: 'FETCH_PLAYLISTS',
  FETCH_PLAYLISTS_SUCCESS: 'FETCH_PLAYLISTS_SUCCESS',
  FETCH_PLAYLISTS_FAIL: 'FETCH_PLAYLISTS_FAIL',
  FETCH_ONE_PLAYLIST: 'FETCH_ONE_PLAYLIST',
  FETCH_ONE_PLAYLIST_SUCCESS: 'FETCH_ONE_PLAYLIST_SUCCESS',
  FETCH_ONE_PLAYLIST_FAIL: 'FETCH_ONE_PLAYLIST_FAIL',
  CREATE_PLAYLIST: 'CREATE_PLAYLIST',
  ADD_TRACKS_TO_PLAYLIST: 'ADD_TRACKS_TO_PLAYLIST',
  CREATE_PLAYLIST_BY_ID_SUCCESS: 'CREATE_PLAYLIST_BY_ID_SUCCESS',
  CREATE_PLAYLIST_WITH_TRACKS_SUCCESS: 'CREATE_PLAYLIST_WITH_TRACKS_SUCCESS',
  FETCH_USER_PLAYLISTS: 'FETCH_USER_PLAYLISTS',
  FETCH_USER_PLAYLISTS_SUCCESS: 'FETCH_USER_PLAYLISTS_SUCCESS',
};

export const actionFetchPlaylists = (payload) => ({type: types.FETCH_PLAYLISTS, payload});
export const actionFetchPlaylistsSuccess = (payload) => ({type: types.FETCH_PLAYLISTS_SUCCESS, payload});
export const actionFetchPlaylistsFail = (payload) => ({type: types.FETCH_PLAYLISTS_FAIL, payload});

export const actionFetchOnePlaylist = (payload) => ({type: types.FETCH_ONE_PLAYLIST, payload});
export const actionFetchOnePlaylistSuccess = (payload) => ({type: types.FETCH_ONE_PLAYLIST_SUCCESS, payload});
export const actionFetchOnePlaylistFail = (payload) => ({type: types.FETCH_ONE_PLAYLIST_FAIL, payload});

export const actionCreatePlaylist = (payload) => ({type: types.CREATE_PLAYLIST, payload});
export const actionCreatePlaylistByIdSuccess = (payload) => ({type: types.CREATE_PLAYLIST_BY_ID_SUCCESS, payload});
export const actionCreatePlaylistWithTracksSuccess = (payload) => ({type: types.CREATE_PLAYLIST_WITH_TRACKS_SUCCESS, payload});

export const actionFetchUserPlaylists = (payload) => ({type: types.FETCH_USER_PLAYLISTS, payload});
export const actionFetchUserPlaylistsSuccess = (payload) => ({type: types.FETCH_USER_PLAYLISTS_SUCCESS, payload});

export default types;
