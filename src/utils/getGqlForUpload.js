import { BACKEND_URL } from '../constants';

export const getGqlForUpload = (data) => {
  const formData = new FormData();
  formData.append('photo', data);
  console.log(data);
  return (fetch(`${BACKEND_URL}/upload`, {
    method: 'POST',
    headers: {
      ...(localStorage.authToken ? {'Authorization': `Bearer ${localStorage.authToken}`}
        : {}),
    },
    body: formData,
  }))
    .then((response) => response.json());
};

export const getGqlForUploadTracks = (data) => {
  console.log(data);
  const formData = new FormData();
  formData.append('track', data);
  console.log(formData, data);

  return (fetch(`${BACKEND_URL}/track`, {
    method: 'POST',
    headers: {
      ...(localStorage.authToken ? {'Authorization': `Bearer ${localStorage.authToken}`}
        : {}),
    },
    body: formData,
  }))
    .then((response) => response.json());
};
