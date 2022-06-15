const baseUrl = 'https://gorest.co.in/public/v2/users';
const apiKey =
  'Bearer 651f88ff783b031d530887c648723f885674a92e473af37d680c14421c4bc58d';

export const getUsers = async () => {
  const response = await fetch(baseUrl);
  if (response.ok) {
    return response.json();
  }
  return null;
};

export const getUserById = async userId => {
  const response = await fetch(`${baseUrl}/${userId}`);
  if (response.ok) {
    return response.json();
  }
  return null;
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${baseUrl}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify(userData),
  });
  return await response.json();
};
