import axios from 'axios';
import { VideoGame } from '../Api/Type/IVideoGame';  // Interfas

const API_URL_GET = 'https://localhost:7029/Videojuegos/ObtenerVideojuegos';
const API_URL_POST = 'https://localhost:7029/Videojuegos/RegistroDeVideojuego';
const API_URL_PUT = 'https://localhost:7029/Videojuegos/{id}';
const API_URL_DELETE = 'https://localhost:7029/Videojuegos/{id}';

export const fetchVideoGame = async (): Promise<VideoGame[]> => {
    const response = await axios.get(API_URL_GET);
    return response.data;
};

export const createVideoGame = async (VideoGame: VideoGame): Promise<VideoGame> => {
    const response = await axios.post(API_URL_POST, VideoGame);
    return response.data;
};

export const updateVideoGame = async (VideoGame: VideoGame): Promise<VideoGame> => {
    const response = await axios.put(`${API_URL_PUT}/${VideoGame.id}`, VideoGame);
    return response.data;
};

export const deleteVideoGame = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL_DELETE}/${id}`);
};
