import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Stack,
  Chip,
} from "@mui/material";
import { Game } from "../../store/reducers/videojuegosReducer";
import { useNavigate } from "react-router-dom";
import imagen_default from "../../assets/images/banner_default.jpg"; // Importar la imagen por defecto

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const formattedDate = new Date(game.fecha_Lanzamiento).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });

  const handleCardClick = () => {
    navigate(`/gamedetails/${game.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const imagePath = imageError ? imagen_default : game.foto_Url || imagen_default;

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
          image={imagePath}
          alt={game.nombre}
          onError={handleImageError} // Manejar errores de carga de imagen
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
            {game.nombre}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#fff", fontSize: 12, textAlign: "left" }}
          >
            Lanzamiento: {formattedDate}
          </Typography>
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              gap: 1,
              marginTop: 1,
            }}
          >
            {game.genero.split(',').map((genero, index) => (
              <Chip
                key={index}
                label={genero.trim()}
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
