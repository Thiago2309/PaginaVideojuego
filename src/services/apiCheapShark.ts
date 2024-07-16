const CheapSharkAPIUrl = 'https://www.cheapshark.com/api/1.0';
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

export const searchDeals = async (title: string) => {
  try {
    const url = `${CheapSharkAPIUrl}/deals?title=${title}&sortBy=dealRating&pageSize=10`;
    const data = await fetchWithCache(url);
    return data.map((deal: any) => ({
      ...deal,
      salePrice: parseFloat(deal.salePrice),
      normalPrice: parseFloat(deal.normalPrice),
    }));
  } catch (error) {
    console.error('Failed to fetch deals:', error);
    return [];
  }
};

export const getDealDetails = async (dealID: string) => {
  try {
    const url = `${CheapSharkAPIUrl}/deals?id=${dealID}`;
    return await fetchWithCache(url);
  } catch (error) {
    console.error('Failed to fetch deal details:', error);
    return null;
  }
};

export const getStores = async () => {
  try {
    const url = `${CheapSharkAPIUrl}/stores`;
    return await fetchWithCache(url);
  } catch (error) {
    console.error('Failed to fetch stores:', error);
    return [];
  }
};
