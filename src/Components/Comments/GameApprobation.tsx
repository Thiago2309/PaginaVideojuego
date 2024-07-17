import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import defaultImage from "../../assets/images/GameCatalog/Platforms/defaultPlatformImage.png"; // Imagen por defecto
// Importar imágenes de las plataformas
import Android from "../../assets/images/GameCatalog/Platforms/Android.jpg";
import GameCube from "../../assets/images/GameCatalog/Platforms/GameCube.jpg";
import iOS from "../../assets/images/GameCatalog/Platforms/iOS.jpg";
import Linux from "../../assets/images/GameCatalog/Platforms/Linux.png";
import macOS from "../../assets/images/GameCatalog/Platforms/macOS.png";
import Movil from "../../assets/images/GameCatalog/Platforms/Movil.png";
import NES from "../../assets/images/GameCatalog/Platforms/NES.png";
import NintendoSwitch from "../../assets/images/GameCatalog/Platforms/NintendoSwitch.png";
import PC from "../../assets/images/GameCatalog/Platforms/PC.jpg";
import PlayStation from "../../assets/images/GameCatalog/Platforms/PlayStation.jpg";
import PlayStation2 from "../../assets/images/GameCatalog/Platforms/PlayStation2.png";
import PlayStation3 from "../../assets/images/GameCatalog/Platforms/PlayStation3.jpg";
import PlayStation4 from "../../assets/images/GameCatalog/Platforms/PlayStation4.jpg";
import PlayStation5 from "../../assets/images/GameCatalog/Platforms/PlayStation5.jpg";
import PSP from "../../assets/images/GameCatalog/Platforms/PSP.png";
import SNES from "../../assets/images/GameCatalog/Platforms/SNES.png";
import Wii from "../../assets/images/GameCatalog/Platforms/Wii.jpg";
import Xbox360 from "../../assets/images/GameCatalog/Platforms/Xbox360.png";
import XboxOne from "../../assets/images/GameCatalog/Platforms/XboxOne.png";
import XboxSeriesSX from "../../assets/images/GameCatalog/Platforms/XboxSeriesSX.png";
import Xbox from "../../assets/images/GameCatalog/Platforms/Xbox.png";

interface GameProps {
  game: {
    nombre: string;
    desarollador: string;
    calificacion: number;
    fecha_Lanzamiento: string;
    plataforma: string[];
    genero: string[];
    description: string;
    foto_Url: string;
    usuarioNombre: string;
    rolNombre: string;
  };
  handleBackClick: () => void;
}

const GameApprobation: React.FC<GameProps> = ({ game, handleBackClick }) => {
  const [plataformaImages, setPlataformaImages] = useState<string[]>([]);
  const [ratingColor, setRatingColor] = useState<string>("#ffffff");

  useEffect(() => {
    const platformImagesMap: { [key: string]: string } = {
      "ANDROID": Android,
      "GAMECUBE": GameCube,
      "IOS": iOS,
      "LINUX": Linux,
      "MAC": macOS,
      "MACOS": macOS,
      "MOVIL": Movil,
      "NES": NES,
      "NINTENDO SWITCH": NintendoSwitch,
      "PC": PC,
      "PLAYSTATION": PlayStation,
      "PLAYSTATION 2": PlayStation2,
      "PLAYSTATION 3": PlayStation3,
      "PLAYSTATION 4": PlayStation4,
      "PLAYSTATION 5": PlayStation5,
      "PSP": PSP,
      "SNES": SNES,
      "WII": Wii,
      "XBOX 360": Xbox360,
      "XBOX ONE": XboxOne,
      "XBOX SERIES S/X": XboxSeriesSX,
      "XBOX": Xbox,
    };

    const images = game.plataforma.map(platform => platformImagesMap[platform.toUpperCase()] || defaultImage);
    setPlataformaImages(images);
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
        height: '100%',
      }}
    >
      <CardContent sx={{ padding: 4, flexGrow: 1 }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", color: "#ffffff" }}
        >
          {game.nombre}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff", fontSize: 12, mb: 2 }}>
          {game.desarollador}
        </Typography> 
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
              {plataformaImages.map((image, index) => (
                <Avatar
                  key={index}
                  src={image}
                  sx={{ width: 60, height: 60, borderRadius: "8px", mx: 1 }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        <br />

      </CardContent>
    </Card>
  );
};

export default GameApprobation;
