import React, { useEffect, useState } from 'react';
import { TrackList } from '../../components/TrackList/TrackList';
import { BACKEND_URL } from '../../constants';
import { getGql } from '../../utils/getGql';

// const trackList = [
//   {
//     _id: 1,
//     url: 'https://cdn.drivemusic.club/dl/online/92VXJSQQDxV6Y6mnyWyxLg/1640753197/download_music/novogodnie_pesni/abba-happy-new-year.mp3',
//     originalFileName: 'ABBA - Happy New Year!',
//   },
//   {
//     _id: 2,
//     url: 'https://cdn.drivemusic.club/dl/online/oT6fMW-T0FqmX3gYYp9Ijg/1640753313/download_music/2021/12/oksana-kovalevskaja-happy-end.mp3',
//     originalFileName: 'Оксана Ковалевская - Happy End',
//   },
//   {
//     _id: 3,
//     url: 'https://cdn.drivemusic.club/dl/online/fA4XCWzbjt9Rox1rfhELbA/1640753313/download_music/2021/12/khleb-novogodnjaja.mp3',
//     originalFileName: 'Новогодняя - ХЛЕБ',
//   },
//   {
//     _id: 4,
//     url: 'https://cdn.drivemusic.club/dl/online/cUrD6jj6Npb7dUu8IR0MLA/1640835038/download_music/2014/05/nico-vinz-am-i-wrong.mp3',
//     originalFileName: 'Am I Wrong - Nico & Vinz',
//   },
// ];

export const MainPage = () => {
  const [tracks, setTracks] = useState([]);

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

  return (
    <div>
      <TrackList trackList={tracks}/>
    </div>
  );
};
