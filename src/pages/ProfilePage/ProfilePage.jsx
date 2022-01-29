import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar, Box, Button, Grid, Input, InputAdornment, InputLabel, Paper, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useDropzone } from 'react-dropzone';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  actionFindUserById, actionLogOut, actionSetNick,
} from '../../store/types/authTypes';
import { history } from '../../createHistory';
import { jwtDecode } from '../../utils/jwtDecode';
import { actionSetUploadFile } from '../../store/types/uploadTypes';

import { buildUrl } from '../../utils/buildUrl';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [isHovered, setIsHovered] = useState(false);
  const [openNick, setOpenNick] = useState(false);
  const [currentNick, setCurrentNick] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    dispatch(actionSetUploadFile(acceptedFiles[0]));
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/*'});

  useEffect(() => {
    if (user === null && localStorage.getItem('authToken') !== null) {
      const token = jwtDecode(localStorage.getItem('authToken'));
      const {id} = token.sub;

      if (id.length !== 0) {
        dispatch(actionFindUserById(id));
      }
    }
  }, []);

  useEffect(() => {
    setCurrentNick(user?.nick);
  }, [user?.nick]);

  const logOut = () => {
    localStorage.removeItem('authToken');
    dispatch(actionLogOut(null));
    history.push('/login');
  };

  const onChangeNick = (e) => {
    setCurrentNick(e.target.value);
  };

  const closeAndGetChangedNick = () => {
    setOpenNick(!openNick);
    if (currentNick !== null && currentNick.trim().length !== 0) {
      dispatch(actionSetNick(currentNick));
    }
  };
  return (
    <Box
      sx={{
        m: '10px 0 100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '65vh',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          height: '100%',
          width: '70vh',
        }}
      >
        <Grid
          direction="column"
          alignItems="center"
          justifyContent="space-around"
          sx={{
            height: '100%',
          }}
          container
        >
          <Grid item>
            <Grid
              sx={{mb: '10px'}}
              item
            >
              <Typography variant="h5">
                Profile
              </Typography>
            </Grid>
            <Grid item position="relative" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Box sx={{cursor: 'pointer', margin: '30px 0'}} {...getRootProps()} >
                <input {...getInputProps()} />
                <Box position="absolute" zIndex={isHovered ? '1' : '0'}>
                  <Avatar
                    onMouseLeave={() => setIsHovered(!isHovered)}
                    sx={{
                      width: 100, height: 100, backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                  >
                    <AddAPhotoIcon fontSize="large"/>
                  </Avatar>
                </Box>
                <Box>
                  {user?.avatar?.url !== null
                    ? (
                      <Avatar
                        className="avatar"
                        onMouseEnter={() => {
                          setIsHovered(!isHovered);
                        }}
                        sx={{width: 100, height: 100, backgroundColor: '#9c27b0'}}
                        src={buildUrl(user?.avatar?.url ?? '')}
                      />
                    ) : (
                      <Avatar
                        onMouseLeave={() => setIsHovered(!isHovered)}
                        sx={{width: 100, height: 100, backgroundColor: '#9c27b0'}}
                      >
                        <AddAPhotoIcon fontSize="large" color="primary"/>
                      </Avatar>
                    )}
                </Box>
              </Box>
            </Grid>
            <Grid
              sx={{m: '20px'}}
              item
            >
              {openNick
                ? (
                  <Input
                    sx={{
                      mr: '5px',
                    }}
                    value={currentNick === null ? '' : currentNick}
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
                    {user.nick === null || user.nick?.trim().length === 0
                      ? (
                        <Box sx={{display: 'flex'}}>
                          <InputLabel>Enter nick</InputLabel>
                          <EditIcon
                            fontSize="medium"
                            color="primary"
                            cursor="pointer"
                            onClick={() => setOpenNick(!openNick)}
                          />
                        </Box>
                      ) : (
                        <Box sx={{display: 'flex'}}>
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
                        </Box>

                      )}
                  </Grid>
                )}
            </Grid>
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
