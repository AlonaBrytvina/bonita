import React, { useEffect, useState } from 'react';
import {
  IconButton, List, ListItem, Typography,
  Box, CircularProgress,
} from '@mui/material';
import {
  PauseRounded, PlayArrowRounded,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import {
  actionPause, actionPlay,
} from '../../store/types/playerTypes';

export const TrackList = ({tracks, isLoading}) => {
  const dispatch = useDispatch();
  const playerState = useSelector(state => state.player);
  const [currentTracks, setCurrentTracks] = useState([]);

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

  useEffect(() => {
    setCurrentTracks(tracks);
  }, [tracks]);

  const SortableItem = SortableElement(({track}) => (
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
      <Typography>{track?.originalFileName}</Typography>
    </ListItem>
  ));

  const SortableList = SortableContainer(() => (
    <List>
      {currentTracks.map((track, index) => (
        <SortableItem key={`item-${track._id}`} index={index} track={track}/>
      ))}
    </List>
  ));

  const onSortEnd = ({oldIndex, newIndex}) => {
    setCurrentTracks(arrayMoveImmutable(currentTracks, oldIndex, newIndex));
  };

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

  return isLoading ? (
    <CircularProgress/>
  ) : (
    <Box sx={{
      minHeight: '70vh',
    }}
    >
      <SortableList onSortEnd={onSortEnd}/>
    </Box>
  );
};
