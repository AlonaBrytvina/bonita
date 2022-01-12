import React, { useEffect, useState } from 'react';
import {
  Stack, Typography, Pagination, PaginationItem,
} from '@mui/material';
import { getGql } from '../../utils/getGql';
import { BACKEND_URL } from '../../constants';

export const PaginationControlled = (tracks) => {
  const [page, setPage] = useState(1);
  const [trackList, setTrackList] = useState(tracks);

  useEffect(() => {
    const gql = getGql(`${BACKEND_URL}/graphql`);
    gql(`
      query skipTracks($query: String) {
        TrackFind(query: $query) {
       _id url originalFileName
        }
      }
  `, {query: JSON.stringify([{}, {skip: [100]}])})
      .then(data => setTrackList(data.map(track => ({
        ...track,
        url: `${BACKEND_URL}/${track.url}`,
      }))));
  }, []);

  const handleChange = (e) => {
    console.log(page, e);
    setPage(page + 1);
  };

  return (
    <Stack
      spacing={2}
      position="static"
      bottom="0"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Pagination
        page={page}
        count={10}
        onClick={handleChange}
      />
    </Stack>
  );
};
