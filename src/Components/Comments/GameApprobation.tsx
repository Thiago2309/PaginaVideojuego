import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { Comment, ThumbUp, ThumbDown } from "@mui/icons-material";
import EA_Studio from "../../assets/images/GameDetails/Icon_desarrolladores/EA_Studio.png";
import PlayStation from "../../assets/images/GameDetails/Plataformas/PlayStation.jpg";
import Windows from "../../assets/images/GameDetails/Plataformas/Windows.png";
import Xbox from "../../assets/images/GameDetails/Plataformas/Xbox.jpg";

const GameApprobation: React.FC = () => {
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
          Battlefield
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff", fontSize: 12 }}>
          Desarrollado por EA Studio
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
              93%
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
                  bgcolor: "#AC23C2",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "#ffffff", fontWeight: "bold", fontSize: 12 }}
              >
                Nivel Épico
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: "#2C2839", mb: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Comment sx={{ color: "#ffffff", mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#ffffff" }}>
                  Comentarios
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "#ffffff" }}
              >
                2K
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThumbUp sx={{ color: "#ffffff", mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#ffffff" }}>
                  Me gusta
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "#ffffff" }}
              >
                3.1K
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThumbDown sx={{ color: "#ffffff", mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#ffffff" }}>
                  No me gusta
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "#ffffff" }}
              >
                500
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
              <Avatar
                src={PlayStation}
                sx={{ width: 60, height: 60, borderRadius: "8px", mx: 1 }}
              />
              <Avatar
                src={Windows}
                sx={{ width: 60, height: 60, borderRadius: "8px", mx: 1 }}
              />
              <Avatar
                src={Xbox}
                sx={{ width: 60, height: 60, borderRadius: "8px", mx: 1 }}
              />
            </Box>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default GameApprobation;
