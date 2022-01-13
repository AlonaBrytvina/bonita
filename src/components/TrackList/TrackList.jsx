import React, { useEffect, useState } from 'react';
import {
  IconButton, List, ListItem, Typography,
  Stack, Box, Pagination, CircularProgress,
} from '@mui/material';
import {
  PauseRounded, PlayArrowRounded,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionPause, actionPlay,
} from '../../store/types/playerTypes';
import { actionFetchTracks } from '../../store/types/trackTypes';

export const TrackList = ({tracks, trackCount, isLoading}) => {
  const dispatch = useDispatch();
  const playerState = useSelector(state => state.player);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (playerState.trackList.length === 0) {
      return;
    }
    if (playerState.isPlaying) {
      if (playerState.audio === null) {
        const {url} = playerState.trackList.find(track => track._id === playerState.currentPlayingTrackId);
        const audio = new Audio(url);
        audio.play();
      } else {
        playerState.audio.play();
      }
    } else {
      playerState.audio.pause();
    }
  }, [playerState.isPlaying]);

  const togglePlayPause = (id) => {
    if (playerState.isPlaying) {
      playerState.audio.pause();
      if (playerState.currentPlayingTrackId !== id) {
        dispatch(actionPlay({trackList: tracks, id}));
      } else {
        dispatch(actionPause());
      }
    } else {
      dispatch(actionPlay({trackList: tracks, id}));
    }
  };
  useEffect(() => {
    dispatch(actionFetchTracks(page));
  }, [page]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  return isLoading ? (
    <CircularProgress/>
  ) : (
    <Box>
      <List>
        {tracks.map(track => (
          <ListItem key={track._id}>
            <IconButton
              onClick={() => togglePlayPause(track._id)}
            >
              {
                playerState.isPlaying && track._id === playerState.currentPlayingTrackId
                  ? (<PauseRounded fontSize="large" color="primary"/>)
                  : (<PlayArrowRounded fontSize="large" color="primary"/>)
              }
            </IconButton>
            <Typography>{track.originalFileName}</Typography>
          </ListItem>
        ))}
      </List>
      <Stack
        spacing={2}
        position="static"
        bottom="0"
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: '3%',
        }}
      >
        <Pagination
          page={page}
          count={Math.ceil(trackCount / 100)}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
};
