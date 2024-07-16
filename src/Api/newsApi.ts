import axios from 'axios';

const apiKey = '04d2d3b033964671b111571327ea7e55';
const baseUrl = 'https://newsapi.org/v2';

export const getVideoGameNews = async (page = 1, pageSize = 9) => {
    try {
        const response = await axios.get(`${baseUrl}/everything`, {
            params: {
                q: 'video games', // Consulta específica para videojuegos
                apiKey: apiKey,
                language: 'es',
                sortBy: 'publishedAt',
                page: page,
                pageSize: pageSize
            }
        });
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching news", error);
        return [];
    }
};