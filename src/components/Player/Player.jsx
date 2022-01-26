import React, { useEffect } from 'react';
import {
  Box, CircularProgress, IconButton, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  FastForwardRounded,
  FastRewindRounded,
  PauseRounded,
  PlayArrowRounded,
} from '@mui/icons-material';
import { PlayerBar } from '../PlayerBar/PlayerBar';
import { regex } from '../../utils/regex';
import {
  actionNextTrack,
  actionPause,
  actionPlay,
  actionPreviousTrack,
} from '../../store/types/playerTypes';
import { VolumeControl } from '../VolumeControl/VolumeControl';

export const Player = () => {
  const dispatch = useDispatch();
  const playerState = useSelector(state => state.player);

  const togglePlayPause = () => {
    const {trackList, currentPlayingTrackId} = playerState;

    if (playerState.isPlaying) {
      dispatch(actionPause());
    } else {
      dispatch(actionPlay({trackList, id: currentPlayingTrackId}));
    }
  };

  const onBackward = () => {
    dispatch(actionPreviousTrack());
  };

  const onForward = () => {
    dispatch(actionNextTrack());
  };

  useEffect(() => {
    playerState.audio?.addEventListener('ended', onForward);

    return () => {
      playerState.audio?.removeEventListener('ended', onForward);
    };
  }, [playerState.audio]);

  const trackIndex = playerState.trackList.findIndex(track => track._id === playerState.currentPlayingTrackId);

  return (
    <Box sx={{
      width: '100%',
      height: '30vh',
      position: 'sticky',
      bottom: '0',
      backgroundColor: 'white',
      display: playerState.audio === null ? 'none' : 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
    >
      <PlayerBar/>
      <Typography variant="caption">
        {regex(playerState.trackList?.[trackIndex]?.originalFileName ?? '')}
      </Typography>
      <Box
        sx={{
          marginTop: '10px',
        }}
      >
        <IconButton
          color="primary"
          onClick={onBackward}
        >
          <FastRewindRounded fontSize="large"/>
        </IconButton>
        <IconButton
          onClick={togglePlayPause}
          color="primary"
        >
          {playerState.duration === 0
            ? <CircularProgress/>
            : playerState.isPlaying
              ? <PauseRounded fontSize="large"/>
              : <PlayArrowRounded fontSize="large"/>}
        </IconButton>
        <IconButton
          color="primary"
          onClick={onForward}
        >
          <FastForwardRounded
            fontSize="large"
          />
        </IconButton>
      </Box>
      <VolumeControl />
    </Box>
  );
};
