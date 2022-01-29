import { getGql } from '../utils/getGql';
import { BACKEND_URL, LIMIT } from '../constants';

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
    limit: [LIMIT.PLAYLISTS_ON_PAGE],
    skip: [(page - 1) * LIMIT.PLAYLISTS_ON_PAGE],
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
     mutation createPlaylist ($playlistName: String!){
                PlaylistUpsert(playlist: {name: $playlistName}) {
                    _id
                }
            }
  `, {playlistName});

export const addTracksToPlaylist = ({playlistId, arrayOfTracks}) => (getGql(`
      mutation p($playlist:PlaylistInput){
         PlaylistUpsert(playlist:$playlist){
         _id name tracks{
               _id originalFileName url
            }
         }
      }
`, {playlist: {_id: playlistId, tracks: arrayOfTracks}}));

export const getUserPlaylistsCount = (userId) => getGql(`
      query getCount($query: String){
       PlaylistCount(query:$query)
      } 
  `, {
  query: JSON.stringify([{
    ___owner: userId,
    name: {$exists: true, $ne: ''},
    tracks: {$exists: true, $ne: []},
  }]),
});

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
      limit: [LIMIT.PLAYLISTS_ON_PAGE],
      skip: [(page - 1) * LIMIT.PLAYLISTS_ON_PAGE],
    },
  ]),
});
