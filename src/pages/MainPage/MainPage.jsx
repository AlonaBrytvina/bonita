import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TrackList } from '../../components/TrackList/TrackList';
import { actionFetchTracks } from '../../store/types/trackTypes';

export const MainPage = () => {
  const dispatch = useDispatch();
  const tracksState = useSelector(state => state.tracks);

  useEffect(() => {
    dispatch(actionFetchTracks(1));
  }, []);

  return (
    <div>
      <TrackList
        tracks={tracksState.trackList}
        trackCount={tracksState.totalCount}
        isLoading={tracksState.isLoading}
      />
    </div>
  );
};
