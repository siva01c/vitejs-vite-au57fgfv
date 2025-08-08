// utils/apiManager.tsx
const musicApi = async (keyword: string) => {
  try {
    // MusicBrainz API expects GET requests with query parameters
    const url = `https://musicbrainz.org/ws/2/recording?query=${encodeURIComponent(
      keyword
    )}&fmt=json&limit=25`;

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
    console.log('Data fetched:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export { musicApi };
