import React, { useEffect, useState } from 'react';
import {
  Box, Button, ButtonGroup,
  Grid, Pagination, Paper, Stack, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { actionFetchPlaylists, actionFetchUserPlaylists } from '../../store/types/playlistTypes';
import { GenerateGradient } from '../../components/GenerateGradient/GenerateGradient';
import { forwardToPage } from '../../utils/history';

export const PlaylistsPage = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.playlists);
  const {playlists, totalCount} = state;

  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    dispatch(actionFetchPlaylists(page));
  }, []);

  useEffect(() => {
    if (selectedFilter === 'all') {
      dispatch(actionFetchPlaylists(page));
    } else if (selectedFilter === 'my') {
      dispatch(actionFetchUserPlaylists(page));
    }
  }, [page]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  const showUserPlaylists = () => {
    setSelectedFilter('my');
    setPage(1);
    dispatch(actionFetchUserPlaylists(page));
  };

  const showAllPlaylists = () => {
    setSelectedFilter('all');
    setPage(1);
    dispatch(actionFetchPlaylists(page));
  };

  return (
    <Box>
      <ButtonGroup
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: '10px 50px',
        }}
      >
        <Box>
          <Button variant="outlined" onClick={() => forwardToPage('/uploadPlaylist')}>
            <AddBoxIcon fontSize="small"/>
            <Typography marginLeft="5px" variant="button">Create playlist</Typography>
          </Button>
        </Box>
        <Box>
          <Button
            variant={selectedFilter === 'all' ? 'contained' : 'outlined'}
            onClick={showAllPlaylists}
          >
            Playlists
          </Button>
          <Button
            variant={selectedFilter === 'my' ? 'contained' : 'outlined'}
            onClick={showUserPlaylists}
          >
            My playlists
          </Button>
        </Box>
        <Box>
          <Typography
            variant="button"
            color="primary"
            cursor="default"
          >
            {`Total - ${state.totalCount}`}
          </Typography>
        </Box>
      </ButtonGroup>
      <Grid
        spacing={3}
        columns={10}
        sx={{
          margin: '0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        container
      >
        {playlists.map(playlist => (
          <Grid
            key={playlist._id}
            item
          >
            <Link to={`/selectedPlaylist/${playlist._id}`}>
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
