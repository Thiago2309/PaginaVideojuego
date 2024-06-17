import React from "react";
import {
  Box,
  Grid,
  Card,
  Chip,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navegador from "../../layout/Navegador/Navegador";
import Battlefield_banner from "../../assets/images/GameDetails/Banner/Battlefield_banner.jpg";
import Comments from "../../Components/Comments/Comments"; // Importa el componente de comentarios aquí

const GameDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div>
      {/* Componente de navegación */}
      <Navegador />

      {/* Contenedor principal con márgenes laterales ajustados */}
      <Box sx={{ flexGrow: 1, p: 3, mx: { xs: 2, sm: 3, md: 5, lg: 4 } }}>
        <Grid container spacing={2}>
          {/* Primera tarjeta ocupando todo el espacio */}
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "#1C172B", width: "100%" }}>
              <CardContent sx={{ padding: 4 }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ fontWeight: "bold", color: "#ffffff" }}
                    >
                      Battlefield
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#E10AAB", color: "#ffffff" }}
                      onClick={handleBackClick}
                    >
                      Volver
                    </Button>
                  </Grid>
                </Grid>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, color: "#ffffff", textAlign: "left" }}
                >
                  Publicado el 01 de Enero, 2024 por Admin01
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label="Acción"
                      sx={{
                        backgroundColor: "#2C2839",
                        color: "#ffffff",
                        borderRadius: 3,
                        mr: 1,
                      }}
                    />
                    <Chip
                      label="Disparos"
                      sx={{
                        backgroundColor: "#2C2839",
                        color: "#ffffff",
                        borderRadius: 3,
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 2, borderRadius: 3, overflow: "hidden" }}>
                  <img
                    src={Battlefield_banner}
                    alt="Banner Battlefield"
                    style={{ width: "100%" }}
                  />
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
                  Battlefield es una aclamada serie de videojuegos de disparos
                  en primera persona desarrollada por DICE y publicada por
                  Electronic Arts. Con un enfoque en batallas multijugador
                  masivas, Battlefield se distingue por su énfasis en la
                  cooperación entre jugadores y la intensidad de las batallas en
                  entornos destructibles. En Battlefield, los jugadores se
                  sumergen en escenarios de guerra moderna o histórica, desde
                  las trincheras de la Primera Guerra Mundial hasta los campos
                  de batalla futuristas. La serie se destaca por su enfoque en
                  vehículos militares, mapas expansivos y la capacidad de
                  alterar el terreno y los edificios mediante el uso de
                  armamento pesado.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* primera fila con dos tarjetas */}
          <Grid item xs={12} md={8}>
            <Card sx={{ backgroundColor: "#1C172B" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                >
                  Tarjeta Izquierda
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "#ffffff" }}
                >
                  Contenido de la tarjeta izquierda.
                </Typography>
                <Comments />
              </CardContent>
            </Card>
          </Grid>
          {/* segunda fila con dos tarjetas */}
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "#1C172B" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                >
                  Tarjeta Derecha
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "#ffffff" }}
                >
                  Contenido de la tarjeta derecha.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default GameDetails;
