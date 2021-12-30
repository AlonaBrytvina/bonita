import React, { useEffect, useState } from 'react';
import {
  IconButton, List, ListItem, Typography,
  Slider, Stack,
} from '@mui/material';
import { PlayCircle, VolumeUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionPause, actionPlay, actionSetAudio, actionSetCurrentTrackId,
} from '../../store/types/playerTypes';

export const TrackList = ({trackList}) => {
  const dispatch = useDispatch();
  const playerState = useSelector(state => state.player);
  const [volume, setVolume] = useState(0);
  console.log(playerState);

  const onVolumeChange = (id, value) => {
    if (playerState.currentPlayingTrackId === id) {
      setVolume(value / 100);
      playerState.audio.volume = volume;
    }
  };
  useEffect(() => {
    if (playerState.trackList.length === 0) {
      return;
    }
    if (playerState.isPlaying) {
      if (playerState.audio === null) {
        const {url} = playerState.trackList.find(track => track._id === playerState.currentPlayingTrackId);
        const audio = new Audio(url);
        audio.play();
        dispatch(actionSetAudio(audio));
      } else {
        playerState.audio.play();
      }
    } else {
      playerState.audio.pause();
    }
  }, [playerState.isPlaying]);

  useEffect(() => {
    if (playerState.audio !== null) {
      const {url} = playerState.trackList.find(track => track._id === playerState.currentPlayingTrackId);
      const audio = new Audio(url);
      audio.play();
      dispatch(actionSetAudio(audio));
    }
  }, [playerState.currentPlayingTrackId]);

  const togglePlayPause = (id) => {
    if (playerState.currentPlayingTrackId !== null && playerState.currentPlayingTrackId !== id) {
      playerState.audio.pause();
      dispatch(actionSetCurrentTrackId(id));
    } else if (playerState.isPlaying === false) {
      dispatch(actionPlay({
        trackList, id,
      }));
    } else {
      dispatch(actionPause());
    }
  };

  return (
    <List>
      {trackList.map(track => (
        <ListItem key={track._id}>
          <IconButton onClick={() => togglePlayPause(track._id)}>
            <PlayCircle/>
          </IconButton>
          <Typography>{track.originalFileName}</Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={
              {ml: 2, width: 200}
            }
          >
            <VolumeUp/>
            <Slider
              max={100}
              arial-label="Volume"
              onChange={(e) => onVolumeChange(track._id, e.target.value)}
              value={volume * 100}
            />
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};
