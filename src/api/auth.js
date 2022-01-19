import { getGql } from '../utils/getGql';
import { BACKEND_URL } from '../constants';

export const login = (payload) => {
  const {login, password} = payload;
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(`
      query log ($login:String!, $password:String!) {
       login(login:$login, password:$password)
       }
     `, {
    login,
    password,
  });
};

export const registration = (payload) => {
  const {login, password} = payload;
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(
    `mutation reg($login: String!, $password: String!){
         createUser(login:$login,
              password: $password){
         _id login
         }
    }
    `,
    {
      login,
      password,
    },
  );
};

export const findUserById = (_id) => {
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(`
      query findUserById($id: String){
            UserFindOne(query: $id) {
                _id, login, nick, createdAt, avatar {
            _id, url
            }
      }
  }
     `, {id: JSON.stringify([{_id}])});
};
