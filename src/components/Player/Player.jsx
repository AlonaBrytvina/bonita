import React, { useEffect, useState } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  const [minimizePlayer, setMinimizePlayer] = useState(false);

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
    <>
      {!minimizePlayer
        ? (
          <Box
            sx={{
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
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: ' row',
              justifyContent: 'end',
              width: '100%',
              height: '0',
            }}
            >
              <IconButton onClick={() => setMinimizePlayer(!minimizePlayer)}>
                <ExpandMoreIcon color="primary" fontSize="large"/>
              </IconButton>
            </Box>
            <Typography variant="subtitle2">
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
            <VolumeControl/>
          </Box>
        )
        : (
          <Box sx={{
            width: '100%',
            height: '50px',
            position: 'sticky',
            bottom: '0',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '1px solid #9c27b0',
          }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
            >
              <Typography variant="subtitle2">
                {regex(playerState.trackList?.[trackIndex]?.originalFileName ?? '')}
              </Typography>
            </Box>
            <Box sx={{
              width: '0',
            }}
            >
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                // width: '10%',
              }}
              >
                <IconButton onClick={() => setMinimizePlayer(!minimizePlayer)}>
                  <ExpandLessIcon color="primary" fontSize="large"/>
                </IconButton>
              </Box>
            </Box>
          </Box>
        )}
    </>
  );
};
