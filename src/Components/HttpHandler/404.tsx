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
        style={{ minHeight: '80vh' }}
      >
        <Card sx={{ backgroundColor: "#1C172B", width: "80%", mt: 2, mb: 2 }}>
          <CardContent sx={{ padding: isMobile ? 2 : 4 }}>
            <Grid container alignItems="center" justifyContent="center" direction="column">
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#ffffff", textAlign: 'center', fontFamily: "'Press Start 2P', cursive" }}
                >
                  ERROR 404
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" mt={2}>
                  <img src={E404} alt="Error 404" style={{ width: isMobile ? '100%' : '30%' }} />
                </Box>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 2,
                color: "#ffffff",
                textAlign: "center",
                fontSize: "1.2rem",
                fontFamily: "'Press Start 2P', cursive"
              }}
            >
              Lo sentimos, la página que estás buscando no existe. Por favor, verifica la URL o regresa a la página principal.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Footer />
    </>
  );
};

export default Error404;
