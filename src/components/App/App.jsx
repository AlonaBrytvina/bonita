import React from 'react';
import './App.scss';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Header } from '../Header/Header';
import { Player } from '../Player/Player';
import { MainPage } from '../../pages/MainPage/MainPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { PlaylistsPage } from '../../pages/PlaylistsPage/PlaylistsPage';
import store from '../../store/store';
import { theme } from '../../assets/theme';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { SelectedPlaylistPage } from '../../pages/SelectedPlaylistPage/SelectedPlaylistPage';
import { history } from '../../createHistory';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { UploadPlaylist } from '../../pages/UploadPlaylist/UploadPlaylist';
import { UploadTracks } from '../../pages/UploadTracks/UploadTracks';
import { ROUTES } from '../../constants';
import { SnackBar } from '../SnackBar/SnackBar';

export const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Header/>
        <Switch>
          <PrivateRoute exact path={ROUTES.MAIN_PAGE} component={MainPage}/>
          <PrivateRoute exact path={ROUTES.USER_MAIN_PAGE} component={MainPage}/>
          <PrivateRoute exact path={ROUTES.PLAYLISTS_PAGE} component={PlaylistsPage}/>
          <PrivateRoute exact path={ROUTES.USER_PLAYLISTS_PAGE} component={PlaylistsPage}/>
          <PrivateRoute exact path={ROUTES.SELECTED_PLAYLIST_PAGE} component={SelectedPlaylistPage}/>
          <PrivateRoute exact path={ROUTES.UPLOAD_PLAYLIST_PAGE} component={UploadPlaylist}/>
          <PrivateRoute exact path={ROUTES.UPLOAD_TRACKS_PAGE} component={UploadTracks}/>
          <PrivateRoute exact path={ROUTES.PROFILE_PAGE} component={ProfilePage}/>
          <Route exact path={ROUTES.LOGIN_PAGE} component={LoginPage}/>
          <Route exact path={ROUTES.REGISTER_PAGE} component={RegisterPage}/>
        </Switch>
        <Player/>
        <SnackBar/>
      </Router>
    </Provider>
  </ThemeProvider>
);
