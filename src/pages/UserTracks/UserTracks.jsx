import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TrackList } from '../../components/TrackList/TrackList';
import { actionFetchUserTracks } from '../../store/types/trackTypes';

export const UserTracks = () => {
  const dispatch = useDispatch();
  const tracks = useSelector(state => state?.tracks);

  console.log(tracks);

  useEffect(() => {
    dispatch(actionFetchUserTracks());
  }, []);

  return (
    <Box>
      <TrackList
        tracks={tracks ?? []}
      />
    </Box>
  );
};
