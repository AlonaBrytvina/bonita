import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Header } from '../Header/Header';
import { MainPage } from '../../pages/MainPage/MainPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { PlaylistsPage } from '../../pages/PlaylistsPage/PlaylistsPage';
import store from '../../store/store';

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/playlists" component={PlaylistsPage}/>
        <Route exact path="/login" component={LoginPage}/>
      </Switch>
    </BrowserRouter>
  </Provider>
);
