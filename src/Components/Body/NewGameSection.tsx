import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { Box, Card, CardMedia, Typography } from '@mui/material';

interface Game {
  id: number;
  descuento: number;
  foto_Url: string;
}

const GameOffers = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://localhost:7029/Ofertas/ObtenerOfertas');
        const data = await response.json();
        if (data.success) {
          setGames(data.result.map((game: Game) => ({
            id: game.id,
            descuento: game.descuento,
            foto_Url: game.foto_Url
          })).slice(0, 10));
        } else {
          console.error('Failed to fetch games:', data.message);
          setError('Failed to fetch games');
        }
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Error fetching games');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleGameClick = (gameId: number) => {
    navigate(`/gameofferts/${gameId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error}</Box>;

  return (
    <Slider {...settings}>
      {games.map((game) => (
        <Box key={game.id} onClick={() => handleGameClick(game.id)} sx={{ padding: 1 }}>
          <Card sx={{background: "none", maxWidth: 345, maxHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: "white" }}>
            <CardMedia
              component="img"
              image={game.foto_Url}
              alt={`Game ${game.id}`}
              sx={{ height: 160 }}
            />
              <p>{game.descuento + " %"}</p>
          </Card>
        </Box>
      ))}
    </Slider>
  );
};

export default GameOffers;