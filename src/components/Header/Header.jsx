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
import { ROUTES } from '../../constants';

export const Header = () => {
  const user = useSelector(state => state.auth.user);

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
          <Link to={ROUTES.MAIN_PAGE}>
            <Button variant="secondary">
              <AudiotrackIcon/>
              <Typography variant="button" >Tracks</Typography>
            </Button>
          </Link>
          <Link to={ROUTES.PLAYLISTS_PAGE}>
            <Button variant="secondary">
              <FormatListBulletedIcon/>
              <Typography variant="button" marginLeft="5px">Playlists</Typography>
            </Button>
          </Link>
        </Box>
        {localStorage.getItem('authToken')
          ? (
            <Link
              to={user !== null ? ROUTES.PROFILE_PAGE : ROUTES.LOGIN_PAGE}
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
          ) : (
            <IconButton
              size="large"
              color="inherit"
            >
              <LoginIcon/>
            </IconButton>
          )}
      </Toolbar>
    </AppBar>
  );
};
