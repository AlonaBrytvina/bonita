import React, { useCallback, useState } from 'react';
import {
  Typography,
  Box, Paper, Grid, Button, Avatar, InputLabel, Input,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { arrayMoveImmutable } from 'array-move';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { Dropzone } from '../../components/Dropzone/Dropzone';
import './UploadPlaylist.scss';
import { actionCreatePlaylist } from '../../store/types/playlistTypes';

export const UploadPlaylist = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [playlistName, setPlaylistName] = useState(null);

  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(oldFiles => ([
      ...oldFiles,
      ...acceptedFiles,
    ]));
  }, []);

  const onSortEnd = ({oldIndex, newIndex}) => {
    setFiles(arrayMoveImmutable(files, oldIndex, newIndex));
  };

  const onChangePlaylistName = (e) => {
    setPlaylistName(e.target.value);
  };

  const isNameValid = playlistName?.length >= 5 && playlistName?.length < 20 && playlistName?.trim().length !== 0;

  const createPlaylist = () => {
    dispatch(actionCreatePlaylist({playlistName, files}));
    setIsDisabled(!isDisabled);
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
        <Box>
          <InputLabel error={isNameDirty && !isNameValid}>Playlist name</InputLabel>
          <Input
            sx={{
              mr: '5px',
            }}
            onBlur={() => setIsNameDirty(true)}
            error={isNameDirty && !isNameValid}
            onChange={onChangePlaylistName}
          />
        </Box>
        <Box>
          <Dropzone onSortEnd={onSortEnd} multiple onDrop={onDrop} files={files}/>
          {files.length === 0
            ? (
              <Typography>If you want to create a playlist drag and drop an audio file</Typography>
            ) : (
              isDisabled
                ? (
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                      margin: '20px 0',
                    }}
                    onClick={createPlaylist}
                    disabled={!(isNameValid)}
                    fullWidth
                  >
                    Create playlist
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                      margin: '20px 0',
                    }}
                    disabled
                    fullWidth
                  >
                    Uploading
                  </Button>
                )
            )}
        </Box>
      </Paper>
    </Box>
  );
};
