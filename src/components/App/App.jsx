import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Header } from '../Header/Header';
import { Player } from '../Player/Player';
import { MainPage } from '../../pages/MainPage/MainPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { PlaylistsPage } from '../../pages/PlaylistsPage/PlaylistsPage';
import store from '../../store/store';
import { theme } from '../../assets/theme';
import { PaginationControlled } from '../PaginationControlled/PaginationControlled';

export const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/playlists" component={PlaylistsPage}/>
          <Route exact path="/login" component={LoginPage}/>
        </Switch>
        <Player/>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);
