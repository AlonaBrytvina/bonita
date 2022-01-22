import React, { useCallback, useEffect, useState } from 'react';
import {
  Typography,
  Box, Paper, Grid, Button, Avatar, FormControl, InputLabel, Input, InputAdornment, Alert, Snackbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { arrayMoveImmutable } from 'array-move';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import { SortableList } from '../../components/Dropzone/SortableList';
import { Dropzone } from '../../components/Dropzone/Dropzone';
import { actionSetUploadTrack } from '../../store/types/uploadTypes';
import './UploadPlaylist.scss';
import { actionCreatePlaylist } from '../../store/types/playlistTypes';

export const UploadPlaylist = () => {
  const dispatch = useDispatch();
  const upload = useSelector(state => state?.upload.tracks);

  const [uploadTracks, setUploadTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState(null);

  const [isNameDirty, setIsNameDirty] = useState(false);
  const [openChangeName, setOpenChangeName] = useState(true);

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

  const onChangePlaylistName = (e) => {
    setPlaylistName(e.target.value);
  };

  const isNameValid = playlistName?.length >= 5 && playlistName?.length < 20;

  const createPlaylist = () => {
    console.log(playlistName, uploadTracks);
    dispatch(actionCreatePlaylist({playlistName, uploadTracks}));
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
              Create playlist
            </Typography>
          </Grid>
        </Grid>
        {openChangeName
          ? (
            <Box>
              <InputLabel error={isNameDirty && !isNameValid}>Playlist name</InputLabel>
              <Input
                sx={{
                  mr: '5px',
                }}
                onBlur={() => setIsNameDirty(true)}
                // value={currentNick}
                error={isNameDirty && !isNameValid}
                onChange={onChangePlaylistName}
                endAdornment={(
                  <InputAdornment position="end">
                    <CheckBoxIcon
                      onClick={() => {
                        isNameValid ? setOpenChangeName(!openChangeName) : setIsNameDirty(true);
                      }}
                      cursor="pointer"
                      color="primary"
                      fontSize="medium"
                    />
                  </InputAdornment>
                )}
              />
            </Box>
          ) : (
            <Box sx={{
              display: 'flex',
            }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  mr: '5px',
                }}
              >
                {playlistName}
              </Typography>
              <EditIcon
                fontSize="medium"
                color="primary"
                cursor="pointer"
                onClick={() => setOpenChangeName(!openChangeName)}
              />
            </Box>
          )}
        <Box>
          <Dropzone onDrop={onDrop}/>
          <SortableList tracks={uploadTracks} onSortEnd={onSortEnd}/>
          {upload.length === 0
            ? (
              <Typography>If you want to create a playlist drag and drop an audio file</Typography>
            ) : (
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  margin: '20px 0',
                }}
                onClick={createPlaylist}
                disabled={!(isNameValid) && openChangeName}
                fullWidth
              >
                Create playlist
              </Button>
            )}
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
          Success! Playlist was created!
        </Alert>
      </Snackbar>
    </Box>
  );
};
