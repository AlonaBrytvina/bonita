import { getGql } from '../utils/getGql';
import { BACKEND_URL } from '../constants';

export const getPlaylists = () => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(`query nonEmptyPlaylists($query: String){
  PlaylistFind(query: $query) {
   _id name 
  }
}
    `, {
    query: JSON.stringify([{
      name: {$exists: true, $ne: ''},
      tracks: {$exists: true, $ne: []},
    }]),
  });
};

export const getSelectedPlaylist = (_id) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  console.log(_id);
  return gql(`query FindOnePlaylist($playlist:String!) {
         PlaylistFindOne(query:$playlist){
               _id name description tracks{
                     _id url originalFileName
               }
         }
    } 
    `, {playlist: JSON.stringify([{_id}])})
    .then(data => data.tracks.map(track => ({
      ...track,
      url: `${BACKEND_URL}/${track.url}`,
    })));
};

export const getPlaylistsWithPage = (page = 1) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(`
      query skipPlaylist($query: String){
          PlaylistFind(query:$query){
          _id name 
           }
      }
  `, {
    query: JSON.stringify([{
      name: {$exists: true, $ne: ''},
      tracks: {$exists: true, $ne: []},
    },
    {
      limit: [20],
      skip: [(page - 1) * 20],
    }])
    ,
  });
};

export const getPlaylistsCount = () => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(`
      query getCount($query: String){
       PlaylistCount(query:$query)
      } 
  `, {
    query: JSON.stringify([{
      name: {$exists: true, $ne: ''},
      tracks: {$exists: true, $ne: []},
    }]),
  });
};

export const createPlaylist = (playlistName) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);

  return gql(`
      mutation createPlaylist{
          PlaylistUpsert(playlist: {name: "${playlistName}"}){
              _id
          }
      }
  `);
};

export const addTracksToPlaylist = ({playlistId, arrayOfTracks}) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);

  return gql(`
      mutation createPlaylist{
          PlaylistUpsert(playlist: {
            _id: "${playlistId}"
             tracks:{
                 _id: "${arrayOfTracks._id}"
             }
          }){
           _id tracks{
              _id 
           }
         }
      }
`);
};

export const getUserPlaylist = (userId) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);

  return gql(`
      query findUserPlaylists($query: String){
          PlaylistFind(query:$query){
          _id name description
      }
    }
  `, {
    query: JSON.stringify([{
      ___owner: userId,
      name: {$exists: true, $ne: ''},
      tracks: {$exists: true, $ne: []},
    }]),
  });
};
