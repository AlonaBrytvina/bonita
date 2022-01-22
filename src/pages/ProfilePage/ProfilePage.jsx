import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar, Box, Button, Grid, Input, InputAdornment, Paper, TextField, Typography, useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useDropzone } from 'react-dropzone';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { actionFindUserById, actionSetNick } from '../../store/types/authTypes';
import { history } from '../../createHistory';
import { jwtDecode } from '../../utils/jwtDecode';
import { actionSetUploadFile } from '../../store/types/uploadTypes';
import { BACKEND_URL } from '../../constants';
import './ProfilePage.scss';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isHovered, setIsHovered] = useState(false);
  const [openNick, setOpenNick] = useState(false);
  const [currentNick, setCurrentNick] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    dispatch(actionSetUploadFile(acceptedFiles[0]));
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  useEffect(() => {
    if (user === null && localStorage.getItem('authToken') !== null) {
      const token = jwtDecode(localStorage.getItem('authToken'));
      const {id} = token.sub;
      if (id.length !== 0) {
        dispatch(actionFindUserById(id));
      }
    }
  }, []);

  console.log(user?.nick);

  useEffect(() => {
    setCurrentNick(user?.nick);
  }, [user?.nick]);

  const logOut = () => {
    localStorage.removeItem('authToken');
    if (localStorage.getItem('authToken') === null) {
      history.push('/login');
    }
  };

  const onChangeNick = (e) => {
    setCurrentNick(e.target.value);
  };
  console.log(user);
  const closeAndGetChangedNick = () => {
    setOpenNick(!openNick);
    console.log(currentNick, user);
    dispatch(actionSetNick(currentNick));
  };
  return (
    <Box
      sx={{
        m: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '65vh',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          height: '100%',
          width: '80vh',
        }}
      >
        <Grid
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: '100%',
          }}
          container
        >
          <Grid
            sx={{mb: '10px'}}
            item
          >
            <Typography variant="subtitle2">
              Profile
            </Typography>
          </Grid>
          <Grid item position="relative">
            <Box {...getRootProps()} >
              <input {...getInputProps()} />
              <Box position="absolute" zIndex={isHovered ? '1' : '0'}>
                <Avatar
                  className="avatar"
                  onMouseLeave={() => setIsHovered(!isHovered)}
                  sx={{width: 100, height: 100}}
                >
                  <AddAPhotoIcon fontSize="large" color="primary"/>
                </Avatar>
              </Box>
              <Box>
                <Avatar
                  className="avatar"
                  onMouseEnter={() => {
                    setIsHovered(!isHovered);
                  }}
                  sx={{width: 100, height: 100}}
                  src={
                    user !== null
                      ? (`${BACKEND_URL}/${user?.avatar?.url}`)
                      : null
                  }
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            onMouseLeave={() => setOpenNick(!openNick)}
            sx={{m: '20px'}}
            item
          >
            {openNick
              ? (
                <Input
                  sx={{
                    mr: '5px',
                  }}
                  value={currentNick}
                  onChange={onChangeNick}
                  endAdornment={(
                    <InputAdornment position="end">
                      <CheckBoxIcon
                        onClick={closeAndGetChangedNick}
                        cursor="pointer"
                        color="primary"
                        fontSize="medium"
                      />
                    </InputAdornment>
                  )}
                />
              )
              : (
                <Grid
                  sx={{
                    mb: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  item
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mr: '5px',
                    }}
                  >
                    {user?.nick}
                  </Typography>
                  <EditIcon
                    fontSize="medium"
                    color="primary"
                    cursor="pointer"
                    onClick={() => setOpenNick(!openNick)}
                  />
                </Grid>
              )}
          </Grid>
          <Grid
            sx={{mt: '10px'}}
            item
          >
            <Button onClick={logOut}>
              Log out
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
