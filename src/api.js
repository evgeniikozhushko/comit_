const baseURL = 'https://randomuser.me/api/';

const apiConfig = {
  baseURL,
  ENDPOINTS: {
    image: `${baseURL}j`,
    search: `${baseURL}search`,
  },
};

export function userProvider() {
  console.log('Users');
}

export async function getUsers(count = 5) {
  try {
    const response = await fetch(`${baseURL}?results=${count}`);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const parsedData = await response.json();
    return parsedData.results || [];
  }
  catch (error) {
    console.error('getUsers error:', error);
    throw error;
  }
}
