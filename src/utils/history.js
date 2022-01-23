import { history } from '../createHistory';

export const forwardToPage = (location) => {
  if (localStorage.getItem('authToken')) {
    history.push(location);
  }
};
