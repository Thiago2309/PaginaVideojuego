import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  CardActionArea,
  Stack,
  Box,
} from "@mui/material";
import { GameOffert } from "./dataOfferts";
import { useNavigate } from "react-router-dom";

const GameCardOff: React.FC<{ game: GameOffert }> = ({ game }) => {
  const navigate = useNavigate();

  // Asegurarse de que la fecha se interprete correctamente
  const formattedDate = new Date(game.releaseDate).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC", // Esto asegura que la fecha se mantenga en UTC
  });

  const handleCardClick = () => {
    navigate("/gameofferts");
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
        position: "relative",
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="300"
            width="100%"
            image={game.image}
            alt={game.title}
          />
          <Chip
            label={`-${game.discount}%`}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#489D2D",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 14,
            }}
          />
        </Box>
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#3CC70C", fontWeight: "bold", fontSize: 12, textAlign: "left" }}
          >
            Por MX${game.price.toFixed(2)}
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

export default GameCardOff;
