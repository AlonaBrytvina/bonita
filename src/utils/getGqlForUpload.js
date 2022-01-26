import { BACKEND_URL } from '../constants';

export const getGqlForUpload = ({formData, fetchPart}) => fetch(`${BACKEND_URL}/${fetchPart}`, {
  method: 'POST',
  headers: {
    ...(localStorage.authToken ? {'Authorization': `Bearer ${localStorage.authToken}`}
      : {}),
  },
  body: formData,
}).then((response) => response.json());
