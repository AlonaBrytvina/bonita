import { history } from '../createHistory';

export const forwardToMainPage = (location) => {
  if (localStorage.getItem('authToken')) {
    history.push(location);
  }
};

export const forwardToUploadPage = (location) => {
  if (localStorage.getItem('authToken')) {
    history.push(location);
  }
};

export const forwardToCreatePlaylistPage = (location) => {
  if (localStorage.getItem('authToken')) {
    history.push(location);
  }
};
