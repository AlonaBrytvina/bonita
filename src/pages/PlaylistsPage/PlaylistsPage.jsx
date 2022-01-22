import React, { useEffect, useState } from 'react';
import {
  Box, Button, ButtonGroup, CircularProgress,
  Grid, Pagination, Paper, Stack, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionFetchPlaylists, actionFetchUserPlaylists } from '../../store/types/playlistTypes';
import { GenerateGradient } from '../../components/GenerateGradient/GenerateGradient';
import { forwardToCreatePlaylistPage } from '../../utils/history';

export const PlaylistsPage = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.playlists);
  const {playlists, totalCount} = state;
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(actionFetchPlaylists(page));
  }, [page]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  const showUserPlaylists = () => {
    dispatch(actionFetchUserPlaylists());
  };

  const showAllPlaylists = () => {
    dispatch(actionFetchPlaylists(page));
  };

  return (
    <Box>
      <ButtonGroup
        sx={{
          mt: '10px',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Box onClick={() => forwardToCreatePlaylistPage('/uploadPlaylist')}>
          <Button variant="outlined">
            Create playlist
          </Button>
        </Box>
        <Box>
          <Button onClick={showAllPlaylists}>
            Playlists
          </Button>
          <Button onClick={showUserPlaylists}>
            My playlists
          </Button>
        </Box>
        <Box>
          <Button
            variant="outlined"
          >
            {`Total:${state.totalCount}`}
          </Button>
        </Box>
      </ButtonGroup>
      <Grid
        spacing={3}
        columns={12}
        sx={{margin: '0', width: '100%'}}
        container
      >
        {playlists.map(playlist => (
          <Grid
            key={playlist._id}
            sx={{mb: '5%'}}
            item
          >
            <Link to={`/selectedPlaylist/${playlist._id}`}>
              <Paper
                sx={{
                  minHeight: '30vh',
                  width: '20vh',
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
          mb: '3%',
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
