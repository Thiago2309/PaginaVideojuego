import axios from 'axios';

const apiKey = 'b188b848fafd4f72b33f4ab4db33796d';
const baseUrl = 'https://newsapi.org/v2';

export const getVideoGameNews = async () => {
    try {
        const response = await axios.get(`${baseUrl}/everything`, {
            params: {
                q: 'video game',
                apiKey: apiKey,
                language: 'es',
                sortBy: 'publishedAt',
                pageSize: 10
            }
        });
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
};
