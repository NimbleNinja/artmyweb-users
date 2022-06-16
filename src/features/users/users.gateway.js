const baseUrl = 'https://gorest.co.in/public/v2/users';
const apiKey =
  'Bearer 651f88ff783b031d530887c648723f885674a92e473af37d680c14421c4bc58d';

export const getUsers = async pageNumber => {
  try {
    const response = await fetch(`${baseUrl}?page=${pageNumber}`);
    if (response.ok) {
      const totalItems = response.headers.get('X-Pagination-Total');
      const users = await response.json();

      return {
        users,
        totalItems,
      };
    }
  } catch (err) {
    console.log(err.message);
  }
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

  if (!response.ok) {
    throw new Error(response.status);
  }

  return await response.json();
};
