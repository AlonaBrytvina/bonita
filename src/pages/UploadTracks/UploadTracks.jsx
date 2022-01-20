import React, { useCallback } from 'react';
import {
  Box, Button, Grid, Paper, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@mui/icons-material/Upload';
import { Link } from 'react-router-dom';
import { actionSetUploadTrack } from '../../store/types/uploadTypes';

export const UploadTracks = () => {
  const dispatch = useDispatch();
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    dispatch(actionSetUploadTrack(acceptedFiles[0]));
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop});

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
          width: '100vh',
        }}
      >
        <Grid
          container
        >
          <Box
            sx={{
              width: '100%',
              height: '50vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
            {...getRootProps()}
          >
            <UploadIcon
              color="primary"
              sx={{
                height: '40px',
                width: '40px',
                mb: '20px',
              }}
            />
            <input {...getInputProps()} />
            <Typography>
              Drop file to upload
            </Typography>
          </Box>
        </Grid>
      </Paper>
      <Link
        to="/userTracks"
      >
        <Button>
          My uploaded tracks
        </Button>
      </Link>
    </Box>
  );
};
