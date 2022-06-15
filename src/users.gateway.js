const baseUrl = 'https://gorest.co.in/public/v2/users';
const apiKey =
  'Bearer 651f88ff783b031d530887c648723f885674a92e473af37d680c14421c4bc58d';

export const getUsers = () => {
  return fetch(baseUrl).then(response => {
    if (response.ok) {
      return response.json();
    }

    return null;
  });
};

export const getUserById = userId => {
  return fetch(`${baseUrl}/${userId}`).then(response => {
    if (response.ok) {
      return response.json();
    }

    return null;
  });
};

export const updateUser = (userId, userData) => {
  console.log(userId, userData);
  return fetch(`${baseUrl}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify(userData),
  }).then(response => response.json());
};
