import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, ButtonGroup, Pagination, Stack,
} from '@mui/material';
import { TrackList } from '../../components/TrackList/TrackList';
import { actionFetchTracks, actionFetchUserTracks } from '../../store/types/trackTypes';
import { forwardToUploadPage } from '../../utils/history';

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

  const showMyTracks = () => {
    dispatch(actionFetchUserTracks());
  };

  const showAllTracks = () => {
    dispatch(actionFetchTracks(page));
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
        <Box>
          <Button
            onClick={() => forwardToUploadPage('/uploadTracks')}
            variant="outlined"
          >
            Upload tracks
          </Button>
        </Box>
        <Box>
          <Button onClick={showAllTracks}>
            Tracks
          </Button>
          <Button onClick={showMyTracks}>
            My tracks
          </Button>
        </Box>
        <Button
          variant="outlined"
        >
          {`Total: ${tracksState.totalCount}`}
        </Button>
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
