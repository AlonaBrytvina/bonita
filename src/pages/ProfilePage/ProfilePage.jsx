import React, { useCallback, useEffect } from 'react';
import {
  Avatar, Box, Button, Grid, Paper, Typography, useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircleOutline } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { actionFindUserById } from '../../store/types/authTypes';
import { history } from '../../createHistory';
import { jwtDecode } from '../../utils/jwtDecode';
import { actionSetUploadFile } from '../../store/types/uploadTypes';
import { BACKEND_URL } from '../../constants';
import './ProfilePage.scss';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const onDrop = useCallback(acceptedFiles => {
    dispatch(actionSetUploadFile(acceptedFiles[0]));
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  console.log(user?.avatar !== null, user);

  useEffect(() => {
    if (user === null && localStorage.getItem('authToken') !== null) {
      const token = jwtDecode(localStorage.getItem('authToken'));
      const {id} = token.sub;
      if (id.length !== 0) {
        console.log(id, 'i tut');
        dispatch(actionFindUserById(id));
      }
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem('authToken');
    if (localStorage.getItem('authToken') === null) {
      history.push('/login');
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{
        margin: '0 25vh',
      }}
    >
      <Grid
        direction="column"
        alignItems="center"
        justifyContent="center"
        rowSpacing="10px"
        marginTop="10px"
        container
      >
        <Grid
          sx={{m: '10px'}}
          item
        >
          <Typography variant="subtitle">
            Profile
          </Typography>
        </Grid>
        <Grid
          // onClick={changeAvatar}
          item
        >
          <Box {...getRootProps()}>
            <input {...getInputProps()} />
            {
              user?.avatar !== null
                ? (
                  <Avatar
                    className="avatar"
                    sx={{width: 100, height: 100}}
                    src={
                      user === null
                        ? null
                        : (`${BACKEND_URL}/${user?.avatar?.url}`)
                      }
                  />
                )
                : (
                  <Avatar
                    className="avatar"
                    sx={{width: 100, height: 100}}
                  >
                    <AddCircleOutline fontSize="large" color="white"/>
                  </Avatar>
                )
            }
          </Box>
        </Grid>
        <Grid
          sx={{
            mb: '10px',
            display: 'flex',
            flexDirection: 'row',
          }}
          item
        >
          <Typography
            variant="subtitle2"
            sx={{
              mr: '5px',
            }}
          >
            {user?.nick}
          </Typography>
          <EditIcon
            fontSize="small"
            color="primary"
          />
        </Grid>
        <Grid
          sx={{mb: '10px'}}
          item
        >
          <Button onClick={logOut}>
            Log out
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
