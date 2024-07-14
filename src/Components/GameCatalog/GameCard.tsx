import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  CardActionArea,
  Stack,
} from "@mui/material";
import { Game } from "./data";
import { useNavigate } from "react-router-dom";

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const navigate = useNavigate();

  // Asegurarse de que la fecha se interprete correctamente
  const formattedDate = new Date(game.releaseDate).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC", // Esto asegura que la fecha se mantenga en UTC
  });

  const handleCardClick = () => {
    navigate("/gamedetails");
  };

  if (!game || !game.categories) {
    return null; // Maneja el caso donde el juego o sus categorías son undefined
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "transparent",
        boxShadow: "none",
        borderRadius: 0,
        paddingBottom: 0,
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="300"
          width="100%"
          image={game.image}
          alt={game.title}
        />
        <CardContent sx={{ backgroundColor: "transparent", padding: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "left",
              marginTop: 0.5,
              marginBottom: 0,
            }}
          >
            {game.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#fff", fontSize: 12, textAlign: "left" }}
          >
            {game.likes} k les gusta
          </Typography>
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              gap: 1,
              marginTop: 1,
            }}
          >
            {game.categories.map((category) => (
              <Chip
                key={category}
                label={category}
                color="primary"
                size="small"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 11,
                  backgroundColor: "#2C2839",
                }}
              />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameCard;
