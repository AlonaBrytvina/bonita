import React from 'react';

export const BACKEND_URL = 'http://player.asmer.fs.a-level.com.ua';

export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const ROUTES = {
  MAIN_PAGE: '/',
  USER_MAIN_PAGE: '/userTracks',
  PLAYLISTS_PAGE: '/playlists',
  USER_PLAYLISTS_PAGE: '/userPlaylists',
  SELECTED_PLAYLIST_PAGE: '/selectedPlaylist/:id',
  UPLOAD_PLAYLIST_PAGE: '/uploadPlaylist',
  UPLOAD_TRACKS_PAGE: '/uploadTracks',
  PROFILE_PAGE: '/profile',
  LOGIN_PAGE: '/login',
  REGISTER_PAGE: '/register',
};

export const DEFAULT_VOLUME = 1;
