import { history } from '../createHistory';

export const forwardToMainPage = (location) => {
  if (localStorage.getItem('authToken')) {
    history.push(location);
  }
};
