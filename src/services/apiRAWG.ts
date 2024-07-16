const API_KEY = '313c8cc426824836a2dd02499c853d14';
const apiCache = new Map();

const fetchWithCache = async (url: string) => {
  if (apiCache.has(url)) {
    return apiCache.get(url);
  } else {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    apiCache.set(url, data);
    return data;
  }
};

export const searchGames = async (query: string) => {
  try {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=10`;
    const data = await fetchWithCache(url);
    return data.results;
  } catch (error) {
    console.error('Failed to fetch games:', error);
    return [];
  }
};

export const getGameDetails = async (id: number) => {
  try {
    const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    return await fetchWithCache(url);
  } catch (error) {
    console.error('Failed to fetch game details:', error);
    return null;
  }
};

export const getGameScreenshots = async (id: number) => {
  try {
    const url = `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`;
    const data = await fetchWithCache(url);
    return data.results;
  } catch (error) {
    console.error('Failed to fetch game screenshots:', error);
    return [];
  }
};
