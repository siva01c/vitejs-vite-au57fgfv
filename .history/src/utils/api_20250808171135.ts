// utils/api.ts
const musicApi = async (keyword: string = '') => {
  try {
    // MusicBrainz API expects GET requests with query parameters
    const query = keyword || '*';
    const url = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(
      query
    )}&fmt=json&limit=50`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Music API fetch error:', error);
    throw error;
  }
};

const moviesApi = async (keyword: string = '') => {
  try {
    const query = keyword || 'a';
    const url = `https://www.episodate.com/api/search?q=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Movies API fetch error:', error);
    throw error;
  }
};

export { musicApi, moviesApi };
