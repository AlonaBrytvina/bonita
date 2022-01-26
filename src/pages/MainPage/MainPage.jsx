import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Pagination, Stack,
} from '@mui/material';
import { TrackList } from '../../components/TrackList/TrackList';
import { actionFetchTracks, actionFetchUserTracks } from '../../store/types/trackTypes';
import { Filter } from '../../components/Filter/Filter';
import { usePagination } from '../../hooks/usePagination';
import { ROUTES } from '../../constants';
import { forwardToPage } from '../../utils/history';

export const MainPage = () => {
  const tracksState = useSelector(state => state.tracks);

  const [selectedFilter, setSelectedFilter] = useState('all');

  const [page, setPage] = usePagination({
    page: 1,
    selectedFilter,
    actionFetchMy: actionFetchUserTracks,
    actionFetchAll: actionFetchTracks,
  });

  const handleChange = (e, value) => {
    setPage(value);
  };

  const onSelectFilter = filter => {
    setPage(1);
    setSelectedFilter(filter);
  };

  return (
    <Box>
      <Filter
        onClickUpload={() => forwardToPage(ROUTES.UPLOAD_TRACKS_PAGE)}
        onSelect={onSelectFilter}
        categoryName="tracks"
        selectedFilter={selectedFilter}
        count={tracksState.totalCount}
      />
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
