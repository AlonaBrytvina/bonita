import React from 'react';
import './Header.scss';
import { AccountCircle } from '@mui/icons-material';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as Vector } from '../../assets/svgs/Vector.svg';

export const Header = () => (
  <AppBar position="static">
    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Vector className="logo"/>
      <Box sx={{
        width: '50%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}
      >
        <Link to="/">
          <Button variant="secondary">Main</Button>
        </Link>
        <Link to="/playlists">
          <Button variant="secondary">Playlists</Button>
        </Link>
        <Link to="/login">
          <IconButton
            size="large"
            color="inherit"
          >
            <AccountCircle/>
          </IconButton>
        </Link>
      </Box>
    </Toolbar>
  </AppBar>
);
