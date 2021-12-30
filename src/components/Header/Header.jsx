import React from 'react';
import './Header.scss';
import {
  AppBar, Toolbar, Box, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as Vector } from '../../assets/svgs/Vector.svg';

export const Header = () => (
  <AppBar position="relative">
    <Toolbar>
      <Vector className="logo"/>
      <Link to="/">
        <Button variant="secondary">Main</Button>
      </Link>
      <Link to="/playlists">
        <Button variant="secondary">Playlists</Button>
      </Link>
      <Link to="/login">
        <Button variant="secondary">Login</Button>
      </Link>
    </Toolbar>
  </AppBar>
);
