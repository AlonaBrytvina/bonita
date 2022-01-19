import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Pagination, Stack } from '@mui/material';
import { TrackList } from '../../components/TrackList/TrackList';
import { actionFetchTracks } from '../../store/types/trackTypes';

export const MainPage = () => {
  const dispatch = useDispatch();
  const tracksState = useSelector(state => state.tracks);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(actionFetchTracks(page));
  }, [page]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Box>
      <TrackList
        tracks={tracksState.trackList}
        isLoading={tracksState.isLoading}
      />
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
          count={Math.ceil(tracksState.totalCount / 100)}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
};
