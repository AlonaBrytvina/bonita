import React, { useEffect, useState } from 'react';
import {
  Box, IconButton, Slider, Stack,
} from '@mui/material';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import {
  FastForwardRounded, FastRewindRounded, PauseRounded, PlayArrowRounded, VolumeDown, VolumeUp,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerBar } from '../PlayerBar/PlayerBar';
import {
  actionPause, actionPlay, actionSetAudio, actionSetCurrentTrackId,
} from '../../store/types/playerTypes';

export const Player = () => {
  const playerState = useSelector(state => state.player);
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  console.log(playerState);

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
    const {trackList} = playerState;
    const trackIndex = playerState.trackList.findIndex(track => track._id === playerState.currentPlayingTrackId);

    if (trackIndex === 0) {
      const findFirstTrack = playerState.trackList.find((track, index) => index === playerState.trackList.length - 1);
      playerState.audio.pause();

      const {url, _id} = findFirstTrack;
      const audio = new Audio(url);
      const id = _id;

      dispatch(actionSetAudio(audio));
      dispatch(actionPlay({trackList, id}));
    } else {
      const findPrevTrack = playerState.trackList.find((track, index) => index === trackIndex - 1);
      playerState.audio.pause();

      const {url, _id} = findPrevTrack;
      const audio = new Audio(url);
      const id = _id;

      dispatch(actionSetAudio(audio));
      dispatch(actionPlay({trackList, id}));
    }
  };

  const onForward = () => {
    const {trackList} = playerState;
    console.log(trackList);
    const trackIndex = trackList.findIndex(track => track._id === playerState.currentPlayingTrackId);

    if (trackIndex === trackList.length - 1) {
      const findFirstTrack = trackList.find((track, index) => index === 0);
      playerState.audio.pause();

      const {url, _id} = findFirstTrack;

      const audio = new Audio(url);
      const id = _id;

      dispatch(actionSetAudio(audio));
      dispatch(actionPlay({trackList, id}));
    } else {
      const findNextTrack = playerState.trackList.find((track, index) => index === trackIndex + 1);
      playerState.audio.pause();

      const {url, _id} = findNextTrack;

      const audio = new Audio(url);
      const id = _id;

      dispatch(actionSetAudio(audio));
      dispatch(actionPlay({trackList, id}));
    }
  };

  const togglePlayPause = () => {
    const {trackList, currentPlayingTrackId} = playerState;
    const id = currentPlayingTrackId;
    if (playerState.isPlaying) {
      dispatch(actionPause());
      playerState.audio.pause();
    } else if (playerState.isPlaying === false) {
      dispatch(actionPlay({trackList, id}));
      playerState.audio.play();
    }
  };

  return (
    <Box sx={{
      width: '100%',
      height: '20%',
      position: 'sticky',
      bottom: '0',
      backgroundColor: 'white',
      display: playerState.audio === null ? 'none' : 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }}
    >
      <PlayerBar/>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
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
            : volume <= 0.5 && volume !== 0
              ? (<VolumeDown fontSize="large"/>)
              : volume <= 0
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
