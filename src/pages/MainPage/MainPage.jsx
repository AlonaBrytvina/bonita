import React, { useEffect, useState } from 'react';
import { TrackList } from '../../components/TrackList/TrackList';
import { BACKEND_URL } from '../../constants';
import { getGql } from '../../utils/getGql';

export const MainPage = () => {
  const [tracks, setTracks] = useState([]);
  const [trackCount, setTrackCount] = useState([]);

  useEffect(() => {
    const gql = getGql(`${BACKEND_URL}/graphql`);
    gql(`
      query allTracks {
        TrackFind(query: "[{}]") {
         _id url originalFileName
        }
      }
  `).then(data => setTracks(data.map(track => ({...track, url: `${BACKEND_URL}/${track.url}`}))));
  }, []);

  useEffect(() => {
    const gql = getGql(`${BACKEND_URL}/graphql`);
    gql(`
      query getCount{
           TrackCount(query:"[{}]")
             } `).then(response => setTrackCount(response));
  }, []);

  return (
    <div>
      <TrackList tracks={tracks} trackCount={trackCount}/>
    </div>
  );
};
