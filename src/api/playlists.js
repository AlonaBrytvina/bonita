import { getGql } from '../utils/getGql';
import { BACKEND_URL } from '../constants';

export const getPlaylists = () => getGql(`query nonEmptyPlaylists($query: String){
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

export const getSelectedPlaylist = (_id) => getGql(`query FindOnePlaylist($playlist:String!) {
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

export const getPlaylistsWithPage = (page = 1) => getGql(`
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

export const getPlaylistsCount = () => getGql(`
      query getCount($query: String){
       PlaylistCount(query:$query)
      } 
  `, {
  query: JSON.stringify([{
    name: {$exists: true, $ne: ''},
    tracks: {$exists: true, $ne: []},
  }]),
});

export const createPlaylist = (playlistName) => getGql(`
      mutation createPlaylist{
          PlaylistUpsert(playlist: {name: "${playlistName}"}){
              _id
          }
      }
  `);

export const addTracksToPlaylist = ({playlistId, arrayOfTracks}) => getGql(`
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

export const getUserPlaylist = ({userId, page = 1}) => getGql(`
      query findUserPlaylists($query: String){
          PlaylistFind(query:$query){
          _id name description
      }
    }
  `, {
  query: JSON.stringify([
    {
      ___owner: userId,
      name: {$exists: true, $ne: ''},
      tracks: {$exists: true, $ne: []},
    },
    {
      limit: [20],
      skip: [(page - 1) * 20],
    },
  ]),
});
