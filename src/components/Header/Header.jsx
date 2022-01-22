import React from 'react';
import './Header.scss';
import { AccountCircle } from '@mui/icons-material';
import UploadIcon from '@mui/icons-material/Upload';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as Vector } from '../../assets/svgs/Vector.svg';

export const Header = () => {
  console.log(localStorage.getItem('authToken') ? './profile' : './login');
  return (
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
          <Link
            to="/profile"
          >
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
};
