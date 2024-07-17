import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

interface GameDetails {
  name: string;
  platforms: string[];
  description: string;
  imageUrl: string;
}

const NewGameSection = () => {
  const [games, setGames] = useState<GameDetails[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const apiKey = 'f440cc6f53ef461793a6427f1abc6020';

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);
        const fetchedGames = response.data.results.map((game: any) => ({
          name: game.name,
          platforms: game.platforms.map((platform: any) => platform.platform.name),
          description: game.description_raw,
          imageUrl: game.background_image
        }));
        setGames(fetchedGames);
        setCurrentIndex(Math.floor(Math.random() * fetchedGames.length));
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGameDetails();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % games.length);
    }, 5000); // Cambia el juego cada 5 segundos

    return () => clearInterval(interval);
  }, [games.length]);

  if (games.length === 0) return <div>Loading...</div>;

  const { name, platforms, description, imageUrl } = games[currentIndex];

  return (
    <Box sx={{ flexGrow: 1, padding: 4, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', transition: 'opacity 0.5s ease', opacity: 0.85 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#f50057' }}>
        {name}
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontStyle: 'italic' }}>
        Plataformas disponibles: {platforms.join(', ')}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ textAlign: 'justify', margin: '20px' }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
        <img src={imageUrl} alt={name} style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'opacity 0.5s ease', opacity: 1 }} />
      </Box>
    </Box>
  );
};

export default NewGameSection;