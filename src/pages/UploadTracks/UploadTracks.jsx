import React, { useCallback, useEffect, useState } from 'react';
import {
  Typography,
  Box, Paper, Grid, Avatar, Alert, Snackbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { arrayMoveImmutable } from 'array-move';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { SortableList } from '../../components/Dropzone/SortableList';
import { Dropzone } from '../../components/Dropzone/Dropzone';
import { actionSetUploadTrack } from '../../store/types/uploadTypes';
import './UploadTracks.scss';

export const UploadTracks = () => {
  const dispatch = useDispatch();
  const upload = useSelector(state => state?.upload.tracks);

  const [uploadTracks, setUploadTracks] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (upload?.length !== 0) {
      setUploadTracks(prevState => [
        ...prevState,
        {...upload},
      ]);
    }
  }, [upload]);

  const onDrop = useCallback(acceptedFiles => {
    dispatch(actionSetUploadTrack(acceptedFiles[0]));
  }, []);

  const onSortEnd = ({oldIndex, newIndex}) => {
    setUploadTracks(arrayMoveImmutable(uploadTracks, oldIndex, newIndex));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
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
              Add track
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <Dropzone onDrop={onDrop}/>
          <SortableList tracks={uploadTracks} onSortEnd={onSortEnd}/>
          <Typography>If you want to add track drag and drop an audio file</Typography>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      >
        <Alert
          severity="success"
          onClose={handleClose}
        >
          Success! Track was added!
        </Alert>
      </Snackbar>
    </Box>
  );
};
