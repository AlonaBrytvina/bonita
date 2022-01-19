import React, { useCallback } from 'react';
import {
  Box, Grid, Paper, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@mui/icons-material/Upload';
import { actionSetUploadTrack } from '../../store/types/uploadTypes';

export const UploadTracks = () => {
  const dispatch = useDispatch();
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    dispatch(actionSetUploadTrack(acceptedFiles[0]));
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <Paper elevation={10} className="paper">
      <Grid
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
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
  );
};
