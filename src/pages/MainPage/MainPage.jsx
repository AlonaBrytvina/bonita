import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, ButtonGroup, Pagination, Stack, Typography,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { TrackList } from '../../components/TrackList/TrackList';
import { actionFetchTracks, actionFetchUserTracks } from '../../store/types/trackTypes';
import { forwardToPage } from '../../utils/history';

export const MainPage = () => {
  const dispatch = useDispatch();
  const tracksState = useSelector(state => state.tracks);

  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (selectedFilter === 'all') {
      dispatch(actionFetchTracks(page));
    } else if (selectedFilter === 'my') {
      dispatch(actionFetchUserTracks(page));
    }
  }, [page]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  const showUserTracks = () => {
    setSelectedFilter('my');
    setPage(1);
    dispatch(actionFetchUserTracks(page));
  };

  const showAllTracks = () => {
    setSelectedFilter('all');
    setPage(1);
    dispatch(actionFetchTracks(page));
  };

  return (
    <Box>
      <ButtonGroup
        sx={{
          m: '10px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Button
            onClick={() => forwardToPage('/uploadTracks')}
            variant="outlined"
          >
            <FileUploadIcon fontSize="small"/>
            <Typography marginLeft="5px" variant="button">Upload tracks</Typography>
          </Button>
        </Box>
        <Box>
          <Button
            variant={selectedFilter === 'all' ? 'contained' : 'outlined'}
            onClick={showAllTracks}
          >
            Tracks
          </Button>
          <Button
            variant={selectedFilter === 'my' ? 'contained' : 'outlined'}
            onClick={showUserTracks}
          >
            My tracks
          </Button>
        </Box>
        <Typography
          variant="button"
          color="primary"
          cursor="default"
        >
          {`Total - ${tracksState.totalCount}`}
        </Typography>
      </ButtonGroup>
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
