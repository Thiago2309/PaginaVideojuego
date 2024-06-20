import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Grid, Typography, Button, Box, Chip, Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom'; 

interface GamesProps {
  handleBackClick: () => void;
  gameSlug?: string;
}

const GameDetailsSkeleton = () => (
  <Card sx={{ backgroundColor: "#1C172B", width: "100%" }}>
    <CardContent sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton variant="text" width={200} height={40} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" width={300} height={20} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" width="100%" height={200} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" width="100%" height={100} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const Games: React.FC<GamesProps> = ({ handleBackClick, gameSlug: initialGameSlug = "red-dead-redemption-2" }) => {
  const [gameData, setGameData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = "f440cc6f53ef461793a6427f1abc6020";
  const { gameSlug: dynamicGameSlug } = useParams<{ gameSlug: string }>(); 

  const gameSlug = dynamicGameSlug || initialGameSlug;

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games/${gameSlug}?key=${apiKey}`);
        setGameData(response.data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameData();
  }, [gameSlug]);

  if (isLoading) {
    return <GameDetailsSkeleton />;
  }

  if (!gameData) {
    return <Typography variant="h6">No se encontraron datos del juego.</Typography>;
  }

  return (
    <Card sx={{ backgroundColor: "#1C172B", width: "100%" }}>
      <CardContent sx={{ padding: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#ffffff" }}>
              {gameData.name} 
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ backgroundColor: "#E10AAB", color: "#ffffff" }} onClick={handleBackClick}>
              Volver
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, color: "#ffffff", textAlign: "left" }}>
          Publicado el {new Date(gameData.released).toLocaleDateString()} 
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {gameData.genres.map((genre: any) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{
                  backgroundColor: "#2C2839",
                  color: "#ffffff",
                  borderRadius: 3,
                  mr: 1,
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 2, borderRadius: 3, overflow: "hidden" }}>
          <img src={gameData.background_image} alt={`Banner ${gameData.name}`} style={{ width: "100%" }} />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 2,
            color: "#ffffff",
            textAlign: "left",
            fontSize: "1.2rem",
          }}
        >
          {gameData.description_raw} 
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Games;
