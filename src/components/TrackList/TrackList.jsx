import React from 'react';
import {
  IconButton, List, ListItem, Typography,
  Box,
} from '@mui/material';
import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { actionPause, actionPlay } from '../../store/types/playerTypes';
import { SkeletonProduct } from '../Skeleton/SkeletonProduct';
import { regex } from '../../utils/regex';

export const TrackList = ({tracks, isLoading}) => {
  const dispatch = useDispatch();
  const playerState = useSelector(state => state.player);

  const togglePlayPause = id => {
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

  return (
    <Box sx={{
      minHeight: '90vh',
    }}
    >
      {isLoading ? (
        <SkeletonProduct />
      ) : (
        <List>
          {tracks.map(track => (
            <ListItem key={track._id}>
              <IconButton onClick={() => togglePlayPause(track._id)}>
                {playerState.isPlaying && track._id === playerState.currentPlayingTrackId
                  ? <PauseRounded fontSize="large" color="primary"/>
                  : <PlayArrowRounded fontSize="large" color="primary"/>}
              </IconButton>
              <Typography>{regex(track?.originalFileName)}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
