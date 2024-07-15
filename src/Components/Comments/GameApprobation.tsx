import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import EA_Studio from "../../assets/images/GameDetails/Icon_desarrolladores/EA_Studio.png";
import PlayStation from "../../assets/images/GameDetails/Plataformas/PlayStation.jpg";
import Windows from "../../assets/images/GameDetails/Plataformas/Windows.png";
import Xbox from "../../assets/images/GameDetails/Plataformas/Xbox.jpg";
import Movil from "../../assets/images/GameDetails/Plataformas/Movil.jpg";

interface GameProps {
  game: {
    nombre: string;
    desarollador: string;
    calificacion: number;
    fecha_Lanzamiento: string;
    plataforma: string;
    genero: string[];
    description: string;
    foto_Url: string;
  };
  handleBackClick: () => void;
}

const GameApprobation: React.FC<GameProps> = ({ game, handleBackClick }) => {
  const [plataformaImage, setPlataformaImage] = useState<string>("");
  const [ratingColor, setRatingColor] = useState<string>("#ffffff"); // Color inicial

  useEffect(() => {
    switch (game.plataforma.toUpperCase()) {
      case "PC":
        setPlataformaImage(Windows);
        break;
      case "XBOX":
        setPlataformaImage(Xbox);
        break;
      case "PLAYSTATION":
        setPlataformaImage(PlayStation);
        break;
      case "MOVIL":
        setPlataformaImage(Movil);
        break;
      default:
        setPlataformaImage("");
    }
  }, [game.plataforma]);

  useEffect(() => {
    const ratingTitle = getRatingTitle(game.calificacion * 10);
    const color = getColorFromRating(ratingTitle);
    setRatingColor(color);
  }, [game.calificacion]);

 
  const getRatingTitle = (calificacion: number): string => {
    if (calificacion >= 90) {
      return "Mitico";
    } else if (calificacion >= 80) {
      return "Legendario";
    } else if (calificacion >= 70) {
      return "Épico";
    } else if (calificacion >= 50) {
      return "Raro";
    } else {
      return "Común";
    }
  };

  const getColorFromRating = (ratingTitle: string): string => {
    switch (ratingTitle) {
      case "Mitico":
        return "#800080"; 
      case "Legendario":
        return "#00A82D"; 
      case "Épico":
        return "#3CBBF0"; 
      case "Raro":
        return "#D8D8D8"; 
      case "Común":
        return "#B5651D"; 
      default:
        return "#ffffff"; 
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#1C172B",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", color: "#ffffff" }}
        >
          {game.nombre}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff", fontSize: 12 }}>
          {game.desarollador}
        </Typography>
        <Avatar
          src={EA_Studio}
          sx={{
            width: 30,
            height: 30,
            mt: 1,
            mb: 2,
            mx: "auto",
            borderRadius: "50%",
          }}
        />
        <Card sx={{ backgroundColor: "#2C2839", mb: 2 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#ffffff", fontSize: 20 }}>
              Tasa de aprobación
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: "#ffffff", fontWeight: "bold", fontSize: 48 }}
            >
              {game.calificacion * 10}%
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  bgcolor: ratingColor,
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#ffffff", fontWeight: "bold", fontSize: 12 }}
              >
                Nivel {getRatingTitle(game.calificacion * 10)}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: "#2C2839" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#ffffff", fontSize: 15 }}
            >
              Plataformas
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {plataformaImage && (
                <Avatar
                  src={plataformaImage}
                  sx={{ width: 60, height: 60, borderRadius: "8px", mx: 1 }}
                />
              )}
            </Box>
          </CardContent>
        </Card>

        <br />

        <Card sx={{ backgroundColor: "#2C2839", mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: "#ffffff", fontSize: 20 }}>
              Descripción
            </Typography>
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
              {game.description}
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default GameApprobation;
