import { BACKEND_URL } from '../constants';

export const getGqlForUpload = ({data, formName, fetchPart}) => {
  const formData = new FormData();
  formData.append(formName, data);
  console.log(data, formName, fetchPart);

  return (fetch(`${BACKEND_URL}/${fetchPart}`, {
    method: 'POST',
    headers: {
      ...(localStorage.authToken ? {'Authorization': `Bearer ${localStorage.authToken}`}
        : {}),
    },
    body: formData,
  }))
    .then((response) => response.json());
};
