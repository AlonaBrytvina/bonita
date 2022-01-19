import { getGql } from '../utils/getGql';
import { BACKEND_URL } from '../constants';

export const setAvatar = ({avatarId, userId}) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  console.log(avatarId, userId);

  return gql(`
      mutation setAvatar{
           UserUpsert(user:{_id: "${userId}", avatar: {_id: "${avatarId}"}}){
                _id, nick, avatar{
                    _id url
                }
           }
      }
     `);
};

export const uploadTracks = (id) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  console.log(id);

  return gql(`
      mutation uploadTrack{
          TrackUpsert(track: {_id: "${id}"}){
                _id, url, originalFileName
           }
      }
     `);
};
