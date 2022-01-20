import { getGql } from '../utils/getGql';
import { BACKEND_URL } from '../constants';

export const getTracksCount = () => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(`
      query getCount {
       TrackCount(query:"[{}]")
      } 
  `);
};

export const getTracksWithPage = (page = 1) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(`
      query skipTracks($query: String) {
        TrackFind(query: $query) {
       _id url originalFileName
        }
      }
  `, {query: JSON.stringify([{}, {skip: [(page - 1) * 100]}])})
    .then(data => data.map(track => ({
      ...track,
      url: `${BACKEND_URL}/${track.url}`,
    })));
};

export const getMyTracks = (userId) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(`
      query findMyTracks($query: String){
            TrackFind(query: $query){
                 _id url originalFileName
            }
        }
  `, {query: JSON.stringify([{ ___owner: userId }])});
};
