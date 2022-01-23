import { getGql } from '../utils/getGql';

export const setAvatar = ({avatarId, userId}) => getGql(`
      mutation setAvatar{
           UserUpsert(user:{_id: "${userId}", avatar: {_id: "${avatarId}"}}){
                _id, nick, avatar{
                    _id url
                }
           }
      }
     `);

export const uploadTracks = (id) => getGql(`
      mutation uploadTrack{
          TrackUpsert(track: {_id: "${id}"}){
                _id, url, originalFileName
           }
      }
  `);
