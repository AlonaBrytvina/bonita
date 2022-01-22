import React from 'react';
import {
  Box, List, ListItem, Typography,
} from '@mui/material';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({track}) => (
  <ListItem
    key={track._id}
  >
    {/* <IconButton */}
    {/*  onClick={() => togglePlayPause(track._id)} */}
    {/* > */}
    {/*  { */}
    {/*    playerState.isPlaying && track._id === playerState.currentPlayingTrackId */}
    {/*      ? (<PauseRounded fontSize="large" color="primary"/>) */}
    {/*      : (<PlayArrowRounded fontSize="large" color="primary"/>) */}
    {/*  } */}
    {/* </IconButton> */}
    <Typography component="span" variant="caption">{track?.originalFileName}</Typography>
  </ListItem>
));

export const SortableList = SortableContainer(({tracks}) => (
  <List sx={{width: '400px', margin: '20px 0'}}>
    {tracks.map((track, index) => (
      <SortableItem key={`${track._id}item-${+index}`} index={index} track={track}/>
    ))}
  </List>
));
