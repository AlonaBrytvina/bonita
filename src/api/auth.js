import { getGql } from '../utils/getGql';
import { BACKEND_URL } from '../constants';

export const login = (payload) => {
  const {login, password} = payload;
  const gql = getGql(`${BACKEND_URL}/graphql`);
  return gql(`
      query ($login:String!, $password:String!) {
       login(login:$login, password:$password)
       }
     `, {
    login, password,
  });
};
