import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { Skeleton } from "@mui/material";
import { css, keyframes } from "@emotion/react";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeAnimation = css`
  animation: ${fadeIn} 8s ease-in-out infinite alternate;
`;

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Card
    sx={{
      maxWidth: 345,
      height: 450,
      margin: "auto",
      backgroundColor: "transparent",
      color: "white",
      boxShadow: "none",
      borderRadius: "10px",
      overflow: "hidden",
      ...fadeAnimation,
    }}
  >
    <CardActionArea
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{
          width: "100%",
          textAlign: "center",
          color: "black",
          padding: "8px 0",
        }}
      >
        {game.name}
      </Typography>
      <CardMedia
        component="img"
        image={game.background_image}
        alt={game.name}
        sx={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          transition: "transform 0.5s ease-in-out",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />
    </CardActionArea>
  </Card>
);

const NewGameSection: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = "f440cc6f53ef461793a6427f1abc6020";

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${apiKey}`
        );
        const shuffledGames = response.data.results
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setGames(shuffledGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
    const intervalId = setInterval(fetchGames, 8000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "white", marginBottom: "2rem" }}
      >
        Ofertas Especiales
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewGameSection;