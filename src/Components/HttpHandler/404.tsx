import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  CardMedia,
} from "@mui/material";
import Footer from '../../layout/Footer/FooterView';
import Navegador from '../../layout/Navegador/Navegador';
import E404 from '../../assets/images/404.jpg';

const Error404: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Navegador />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '80vh', padding: theme.spacing(3) }}
      >
        <Grid item xs={12} md={6} lg={4} container justifyContent="center">
          <Card sx={{ backgroundColor: "#1C172B", mb: 2, borderRadius: '50%', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              image={E404}
              alt="Error 404"
              sx={{ width: '100%', height: '120%', transform: 'scale(1.2)' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
            <CardContent sx={{ padding: isMobile ? 2 : 4 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", color: "#ffffff", textAlign: 'center', fontFamily: "'Press Start 2P', cursive", mb: 2 }}
              >
                ERROR 404
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  fontFamily: "'Press Start 2P', cursive"
                }}
              >
                Lo sentimos, la página que estás buscando no existe. Por favor, verifica la URL o regresa a la página principal.
              </Typography>
            </CardContent>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Error404;