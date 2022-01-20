import React, { useEffect, useState } from 'react';
import {
  Box, IconButton, Slider, Stack, Typography,
} from '@mui/material';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import {
  FastForwardRounded, FastRewindRounded, PauseRounded, PlayArrowRounded, VolumeDown, VolumeUp,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerBar } from '../PlayerBar/PlayerBar';
import {
  actionNextTrack,
  actionPause, actionPlay, actionPreviousTrack,
} from '../../store/types/playerTypes';

const DEFAULT_VOLUME = 1;
export const Player = () => {
  const playerState = useSelector(state => state.player);
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);
  const trackIndex = playerState.trackList.findIndex(track => track._id === playerState.currentPlayingTrackId);

  const onVolumeChange = (e) => {
    const volume = e.target.value / 100;
    setVolume(volume);
    playerState.audio.volume = volume;
  };

  const onMuted = () => {
    setMuted(!muted);
    !muted ? playerState.audio.volume = 0 : playerState.audio.volume = volume;
  };

  const onBackward = () => {
    dispatch(actionPreviousTrack());
  };

  const onForward = () => {
    dispatch(actionNextTrack());
  };

  const togglePlayPause = () => {
    const {trackList, currentPlayingTrackId} = playerState;

    if (playerState.isPlaying) {
      dispatch(actionPause());
    } else {
      dispatch(actionPlay({trackList, id: currentPlayingTrackId}));
    }
  };

  useEffect(() => {
    playerState.audio?.addEventListener('ended', onForward);

    return () => {
      playerState.audio?.removeEventListener('ended', onForward);
    };
  }, [playerState.audio]);

  useEffect(() => {
    setVolume(DEFAULT_VOLUME);
  }, [playerState.currentPlayingTrackId]);

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
        {playerState.trackList?.[trackIndex]?.originalFileName ?? ''}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
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
          {!playerState.isPlaying
            ? (<PlayArrowRounded fontSize="large"/>)
            : (<PauseRounded fontSize="large"/>)}
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
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        minWidth="20%"
        sx={
          {ml: 2, width: 200}
        }
      >
        <IconButton onClick={onMuted}>
          {muted
            ? (<VolumeOffIcon fontSize="large"/>)
            : volume >= 0.1 && volume <= 0.5
              ? (<VolumeDown fontSize="large"/>)
              : volume === 0
                ? (<VolumeOffIcon fontSize="large"/>)
                : (<VolumeUp fontSize="large"/>)}
        </IconButton>
        <Slider
          arial-label="Volume"
          max={100}
          value={volume * 100}
          onChange={onVolumeChange}
        />
      </Stack>
    </Box>
  );
};
