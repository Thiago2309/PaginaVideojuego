import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Footer from '../../layout/Footer/FooterView'
import Navegador from '../../layout/Navegador/Navegador';

const Nosotros: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Navegador />
      <Card sx={{ backgroundColor: "#1C172B", width: "100%", mt: 2, mb: 2 }}>
        <CardContent sx={{ padding: isMobile ? 2 : 4 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", color: "#ffffff", textAlign: isMobile ? 'center' : 'left' }}
              >
                Nosotros
              </Typography>
            </Grid>
          </Grid>
         
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
            </Box>
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
            Somos un equipo de apasionados por los videojuegos que creemos en la importancia de cuidar nuestro dinero. Nuestro objetivo es proporcionar una plataforma donde los jugadores puedan obtener información detallada y calificaciones de videojuegos, similar a IMDb pero para videojuegos. Queremos que todos los jugadores sepan cuidar su dinero y tomen decisiones informadas sobre en qué juegos invertir. Creemos que cada centavo cuenta y queremos ayudarte a obtener el máximo valor de tus inversiones en juegos. Únete a nosotros en esta misión y juntos haremos de la industria de los videojuegos un lugar mejor para todos.
          </Typography>
        </CardContent>
      </Card>
      <Footer />
    </>
  );
};

export default Nosotros;