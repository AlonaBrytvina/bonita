import React, { useEffect, useState } from 'react';
import {
  IconButton, Slider, Stack,
} from '@mui/material';
import {
  VolumeDown,
  VolumeUp,
} from '@mui/icons-material';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useSelector } from 'react-redux';
import { DEFAULT_VOLUME } from '../../constants';

export const VolumeControl = () => {
  const playerState = useSelector(state => state.player);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  useEffect(() => {
    setVolume(DEFAULT_VOLUME);
  }, [playerState.currentPlayingTrackId]);

  const onVolumeChange = (e) => {
    const volume = e.target.value / 100;
    setVolume(volume);
    playerState.audio.volume = volume;
  };

  const onMuted = () => {
    if (volume === 0) {
      playerState.audio.volume = DEFAULT_VOLUME;
      setVolume(DEFAULT_VOLUME);
    } else {
      playerState.audio.volume = 0;
      setVolume(playerState.audio.volume);
    }
  };

  return (
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
        {volume === 0
          ? (<VolumeOffIcon fontSize="large"/>)
          : volume >= 0.01 && volume <= 0.5
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
  );
};
