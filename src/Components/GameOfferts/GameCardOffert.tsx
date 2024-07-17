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
import imagen_default from "../../assets/images/banner_default.jpg";

const GameCardOff: React.FC<{ game: GameOffert }> = ({ game }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/gameofferts/${game.id}`);
  };

  // Convertir la cadena de géneros en un array para iterar sobre ella
  const generos = game.genero.split(",").map(genero => genero.trim());
  const precio = game.precio !== undefined ? game.precio.toFixed(2) : 'N/A';
  const descuento = game.descuento !== undefined ? `-${game.descuento}%` : '';

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
            image={game.foto_Url || imagen_default}
            alt={game.nombre}
          />
          {descuento && (
            <Chip
              label={descuento}
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
          )}
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
            {game.nombre}
          </Typography>
          {/* <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#fff", fontSize: 12, textAlign: "left" }}
          >
            100 k les gusta
          </Typography> */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#3CC70C", fontWeight: "bold", fontSize: 12, textAlign: "left" }}
          >
            Por MX${precio}
          </Typography>
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              gap: 1,
              marginTop: 1,
            }}
          >
            {generos.map((genero) => (
              <Chip
                key={genero}
                label={genero}
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
