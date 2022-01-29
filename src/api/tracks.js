import { getGql } from '../utils/getGql';
import { BACKEND_URL, LIMIT } from '../constants';

export const getTracksCount = () => getGql(`
      query getCount($query: String) {
          TrackCount(query:$query)
      } 
  `, {
  query: JSON.stringify([{
    originalFileName: {$exists: true, $ne: ''},
  }]),
});

export const getTracksWithPage = (page = 1) => getGql(`
      query skipTracks($query: String) {
        TrackFind(query: $query) {
            _id url originalFileName
        }
      }
  `, {
  query: JSON.stringify([
    {originalFileName: {$exists: true, $ne: ''}},
    {skip: [(page - 1) * LIMIT.TRACKS_ON_PAGE]}]),
})
  .then(data => data.map(track => ({
    ...track,
    url: `${BACKEND_URL}/${track.url}`,
  })));

export const getUserTracks = ({userId, page = 1}) => getGql(`
      query findMyTracks($query: String){
            TrackFind(query: $query){
                 _id url originalFileName
            }
      }
  `, {
  query: JSON.stringify([
    {___owner: userId},
    {skip: [(page - 1) * LIMIT.TRACKS_ON_PAGE]}]),
})
  .then(data => data.map(track => ({
    ...track,
    url: `${BACKEND_URL}/${track.url}`,
  })));

export const getUserTracksCount = (userId) => getGql(`
      query getCount($query: String){
           TrackCount(query: $query)
      } 
  `, {
  query: JSON.stringify([{
    ___owner: userId,
    originalFileName: {$exists: true, $ne: ''},
  }]),
});
