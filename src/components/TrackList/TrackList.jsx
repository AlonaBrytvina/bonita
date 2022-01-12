import React, { useEffect, useState } from 'react';
import {
  IconButton, List, ListItem, Typography,
  Slider, Stack, Box, Pagination, PaginationItem,
} from '@mui/material';
import {
  PauseRounded, PlayArrowRounded, PlayCircle, VolumeDown, VolumeUp,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionPause, actionPlay, actionSetAudio, actionSetCurrentTrackId,
} from '../../store/types/playerTypes';
import { getGql } from '../../utils/getGql';
import { BACKEND_URL } from '../../constants';

export const TrackList = ({tracks, trackCount}) => {
  const dispatch = useDispatch();
  const playerState = useSelector(state => state.player);
  const [trackList, setTrackList] = useState(tracks);
  const [page, setPage] = useState(1);
  console.log(trackList, page);

  useEffect(() => {
    if (playerState.trackList.length === 0) {
      return;
    }
    if (playerState.isPlaying) {
      if (playerState.audio === null) {
        const {url} = trackList.find(track => track._id === playerState.currentPlayingTrackId);
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
    console.log('here', 1);
    if (playerState.audio !== null) {
      console.log('here', 2);
      if (playerState.audio.duration === playerState.audio.currentTime) {
        console.log('here', 3);

        playerState.audio.addEventListener('onended', togglePlayPause);

        return () => {
          playerState.audio.removeEventListener('onended', togglePlayPause);
        };
      }
      ;
    }
  }, [playerState.audio?.currentTime]);

  useEffect(() => {
    if (playerState.audio !== null) {
      console.log(trackList, playerState.currentPlayingTrackId);
      const {url} = trackList.find(track => track._id === playerState.currentPlayingTrackId);
      const audio = new Audio(url);
      audio.play();
      dispatch(actionSetAudio(audio));
      const id = playerState.currentPlayingTrackId;
      dispatch(actionPlay({
        trackList, id,
      }));
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
  useEffect(() => {
    const gql = getGql(`${BACKEND_URL}/graphql`);
    gql(`
      query skipTracks($query: String) {
        TrackFind(query: $query) {
       _id url originalFileName
        }
      }
  `, {query: JSON.stringify([{}, {skip: [(page - 1) * 100]}])})
      .then(data => setTrackList(data.map(track => ({
        ...track,
        url: `${BACKEND_URL}/${track.url}`,
      }))));
  }, [page]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Box>
      <List>
        {trackList.map(track => (
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
