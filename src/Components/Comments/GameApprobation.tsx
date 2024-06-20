import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Box, Skeleton } from "@mui/material";
import { Comment, ThumbUp, ThumbDown } from "@mui/icons-material";
import axios from 'axios';
import EA_Studio from "../../assets/images/GameDetails/Icon_desarrolladores/EA_Studio.png";
import PlayStation from "../../assets/images/GameDetails/Plataformas/PlayStation.jpg";
import Windows from "../../assets/images/GameDetails/Plataformas/Windows.png";
import Xbox from "../../assets/images/GameDetails/Plataformas/Xbox.jpg";

const GameDetailsSkeleton = () => (
  <Card sx={{ backgroundColor: "#1C172B", display: "flex", flexDirection: "column", height: "100%" }}>
    <CardContent sx={{ padding: 4 }}>
      <Skeleton variant="text" width={200} height={40} />
      <Skeleton variant="text" width={150} height={20} />
      <Skeleton variant="circular" width={30} height={30} sx={{ mx: "auto", mt: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={150} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={150} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={150} />
    </CardContent>
  </Card>
);

const GameApprobation: React.FC = () => {
  const [gameData, setGameData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = "f440cc6f53ef461793a6427f1abc6020";
  const gameSlug = "red-dead-redemption-2"; 

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
  
  const ratingPercentage = Math.round((gameData.rating / 5) * 100); 

  let ratingLevel = "Unknown";
  if (ratingPercentage >= 90) ratingLevel = "Épico";
  else if (ratingPercentage >= 75) ratingLevel = "Genial";
  else if (ratingPercentage >= 50) ratingLevel = "Bueno";
  else ratingLevel = "Regular";

  const getPlatformImage = (platformSlug: string) => {
    switch (platformSlug) {
      case "playstation4":
        return PlayStation;
      case "pc":
        return Windows;
      case "xbox-one":
        return Xbox;
      default:
        return undefined; 
    }
  };

  return (
    <Card sx={{ backgroundColor: "#1C172B", display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent sx={{ padding: 4 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#ffffff" }}>
          {gameData.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff", fontSize: 12 }}>
          Desarrollado por {gameData.developers[0]?.name || "Desconocido"}
        </Typography>
        <Avatar src={gameData.developers[0]?.image_background || EA_Studio} sx={{ width: 30, height: 30, mt: 1, mb: 2, mx: "auto", borderRadius: "50%" }} />
        <Card sx={{ backgroundColor: "#2C2839", mb: 2 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#ffffff", fontSize: 20 }}>
              Tasa de aprobación
            </Typography>
            <Typography variant="h2" sx={{ color: "#ffffff", fontWeight: "bold", fontSize: 48 }}>{ratingPercentage}%</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
              <Box sx={{ width: 15, height: 15, bgcolor: "#AC23C2", borderRadius: "50%", mr: 1 }} />
              <Typography variant="body2" sx={{ color: "#ffffff", fontWeight: "bold", fontSize: 12 }}>
                Nivel {ratingLevel}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: "#2C2839", mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Comment sx={{ color: "#ffffff", mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#ffffff" }}>Comentarios</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "#ffffff" }}>-</Typography> 
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThumbUp sx={{ color: "#ffffff", mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#ffffff" }}>Me gusta</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "#ffffff" }}>-</Typography> 
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThumbDown sx={{ color: "#ffffff", mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#ffffff" }}>No me gusta</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "#ffffff" }}>-</Typography> 
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: "#2C2839" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ffffff", fontSize: 15 }}>Plataformas</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {gameData.platforms?.map((platform: any) => (
                <Avatar 
                  key={platform.platform.id}
                  src={getPlatformImage(platform.platform.slug)}
                  sx={{ width: 60, height: 60, borderRadius: "8px", mx: 1 }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default GameApprobation;

