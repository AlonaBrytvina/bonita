import { buildUrl } from './buildUrl';

export const getGql = (query, variables = {}) => fetch(buildUrl('graphql'), {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...(localStorage.authToken ? {'Authorization': `Bearer ${localStorage.authToken}`}
      : {}),
  },
  body: JSON.stringify({query, variables}),
})
  .then(res => res.json())
  .then(data => {
    if (data.errors && !data.data) {
      throw new Error(JSON.stringify(data.errors));
    }

    return data.data[Object.keys(data.data)[0]];
  });
