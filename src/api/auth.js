import { getGql } from '../utils/getGql';

export const login = (payload) => {
  const {login, password} = payload;

  return getGql(`
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

  return getGql(
    `
      mutation reg($login: String!, $password: String!){
         createUser(
             login:$login,
             password: $password
         ){
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

export const findUserById = (_id) => (getGql(`
    query findUserById($id: String){
       UserFindOne(query: $id) {
           _id, login, nick, createdAt, avatar {
               _id, url
           }
       }
    }
     `, {
  id: JSON.stringify([{_id}]),
})
);

export const setNick = ({id, nick}) => getGql(`
      mutation setNick{
          UserUpsert(user: {
             _id: "${id}", nick: "${nick}",
             }
          ){
             _id, login, nick, createdAt, avatar {
                  _id, url
             }
          }
      }
  `);
