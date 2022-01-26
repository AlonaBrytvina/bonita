import React, { useCallback, useState } from 'react';
import {
  Typography,
  Box, Paper, Grid, Avatar, Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { arrayMoveImmutable } from 'array-move';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { Dropzone } from '../../components/Dropzone/Dropzone';
import './UploadTracks.scss';
import { actionSetUploadTrack } from '../../store/types/uploadTypes';

export const UploadTracks = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const addTrack = () => {
    dispatch(actionSetUploadTrack(files));
  };

  const onDrop = useCallback(acceptedFiles => {
    setFiles(oldFiles => ([
      ...oldFiles,
      ...acceptedFiles,
    ]));
  }, []);

  const onSortEnd = ({oldIndex, newIndex}) => {
    setFiles(arrayMoveImmutable(files, oldIndex, newIndex));
  };

  return (
    <Box>
      <Paper elevation={10} className="paperStyleForPlaylist">
        <Grid
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          container
        >
          <Grid item>
            <Avatar sx={{mb: '15px', backgroundColor: '#9c27b0'}}>
              <AudioFileIcon color="white"/>
            </Avatar>
          </Grid>
          <Grid
            sx={{
              mb: '20px',
            }}
            item
          >
            <Typography
              variant="h4"
            >
              Add tracks
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <Dropzone onSortEnd={onSortEnd} multiple onDrop={onDrop} files={files}/>
          {files.length === 0
            ? (
              <Typography>If you want to add tracks drag and drop an audio file</Typography>
            ) : (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  margin: '20px 0',
                }}
                onClick={addTrack}
                fullWidth
              >
                Upload tracks
              </Button>
            )}
        </Box>
      </Paper>
    </Box>
  );
};
