import React from 'react';
import './Header.scss';
import {
  AppBar, Toolbar, IconButton, Box, Button, Avatar, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { ReactComponent as Vector } from '../../assets/svgs/Vector.svg';
import { buildUrl } from '../../utils/buildUrl';

export const Header = () => {
  const user = useSelector(state => state.auth.user);
  console.log(user);

  return (
    <AppBar position="static">
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
        <Link to="/">
          <Vector className="logo"/>
        </Link>
        <Box sx={{
          width: '20%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
        >
          <Link to="/">
            <Button variant="secondary">
              <AudiotrackIcon/>
              <Typography variant="button" >Tracks</Typography>
            </Button>
          </Link>
          <Link to="/playlists">
            <Button variant="secondary">
              <FormatListBulletedIcon/>
              <Typography variant="button" marginLeft="5px">Playlists</Typography>
            </Button>
          </Link>
        </Box>
        <Link
          to={user !== null ? '/profile' : '/login'}
        >
          <IconButton
            size="large"
            color="inherit"
          >
            {user !== null && user !== undefined
              ? (
                <Avatar
                  className="avatar"
                  sx={{width: 30, height: 30}}
                  src={buildUrl(user?.avatar?.url ?? '')}
                />
              ) : (
                <LoginIcon/>
              )}
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
