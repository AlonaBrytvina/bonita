import types from '../types/playlistTypes';

const initialState = {
  playlists: [],
  isLoading: false,
  totalCount: 0,
  selectedPlaylist: [],
};

export function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLAYLISTS:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_PLAYLISTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalCount: action.payload.playlistsCount,
        playlists: action.payload.playlists,
      };
    case
      types.FETCH_PLAYLISTS_FAIL:
      return {
        ...state,
      };
    case types.FETCH_ONE_PLAYLIST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_ONE_PLAYLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedPlaylist: action.payload,
      };
    case types.FETCH_ONE_PLAYLIST_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
