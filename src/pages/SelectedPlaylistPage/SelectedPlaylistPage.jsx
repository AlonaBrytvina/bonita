import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { actionFetchOnePlaylist } from '../../store/types/playlistTypes';
import { TrackList } from '../../components/TrackList/TrackList';
import { SkeletonProduct } from '../../components/Skeleton/SkeletonProduct';

export const SelectedPlaylistPage = () => {
  const playlists = useSelector(state => state.playlists);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(actionFetchOnePlaylist(params.id));
  }, []);

  return (
    <Box>
      {playlists.isLoading
        ? <SkeletonProduct/>
        : <TrackList tracks={playlists?.selectedPlaylist ?? []} isLoading={playlists.isLoading}/>}
    </Box>
  );
};
