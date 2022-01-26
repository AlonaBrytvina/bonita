import React, { useState } from 'react';
import {
  Box,
  Grid, Pagination, Paper, Stack, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionFetchPlaylists, actionFetchUserPlaylists } from '../../store/types/playlistTypes';
import { GenerateGradient } from '../../components/GenerateGradient/GenerateGradient';
import { forwardToPage } from '../../utils/history';
import { Filter } from '../../components/Filter/Filter';
import { usePagination } from '../../hooks/usePagination';
import { ROUTES } from '../../constants';
import { SkeletonProductPlaylists } from '../../components/Skeleton/SkeletonProduct';

export const PlaylistsPage = () => {
  const state = useSelector(state => state.playlists);
  const {playlists, totalCount, isLoading} = state;

  const [selectedFilter, setSelectedFilter] = useState('all');

  const [page, setPage] = usePagination({
    page: 1,
    selectedFilter,
    actionFetchMy: actionFetchUserPlaylists,
    actionFetchAll: actionFetchPlaylists,
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
        onClickUpload={() => forwardToPage(ROUTES.UPLOAD_PLAYLIST_PAGE)}
        onSelect={onSelectFilter}
        categoryName="playlists"
        selectedFilter={selectedFilter}
        count={totalCount}
      />
      {isLoading ? (
        <SkeletonProductPlaylists />
      ) : (
        <Grid
          spacing={3}
          columns={10}
          style={{
            margin: '0',
            width: '100%',
            display: 'flex',
            minHeight: 'calc(640px - 35vh)',
          }}
          container
        >
          {playlists.map(playlist => (
            <Grid
              key={playlist._id}
              item
            >
              <Link to={`${ROUTES.SELECTED_PLAYLIST_PAGE.replace(':id', playlist._id)}`}>
                <Paper
                  sx={{
                    minHeight: '30vh',
                    width: '25vh',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}
                  elevation={10}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <GenerateGradient/>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {playlist.name}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
      <Stack
        spacing={2}
        position="static"
        bottom="0"
        sx={{
          display: 'flex',
          alignItems: 'center',
          m: '3%',
        }}
      >
        <Pagination
          page={page}
          count={Math.ceil(totalCount / 20)}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
};
