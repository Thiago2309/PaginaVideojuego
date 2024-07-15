import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import img1 from '../../assets/images/controlL.png';
import ContactSection from '../Contact/ContactSection';
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';

const HeaderSectionLeft = () => {
  const user = useSelector((state: RootState) => state.user); 
  const isLoggedIn = !!user.id;
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1, padding: 4, color: 'white', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ width:'70%', position: 'absolute', top:'-10px', right:'0', display: {md:'none'} }}>
        <img src={img1} alt="Gaming" style={{ 
          position: 'absolute', 
          top: '0', 
          left: '0', 
          opacity: 0.3, 
          zIndex: 1 
        }} />
      </Box>
      <Grid container spacing={2} alignItems="center" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid item xs={12} md={12} lg={6}>
          <Box>
            <Typography variant="h3" gutterBottom sx={{ textAlign: 'left', mt: { xs: '80px', sm: '80px', md: 'none' } }}>
              ¡Bienvenidos al Epicentro 
              de los Videojuegos!
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ textAlign: 'left', justifyContent: { xs: 'none', sm: 'none', md: 'flex-start' } }}>
              Sumérgete en el universo de los videojuegos con las últimas noticias, reseñas y lanzamientos. 
              Explora mundos increíbles, descubre nuevas aventuras y mantente al día con las tendencias más recientes de la industria. 
              Ya seas un jugador casual o un gamer experimentado, aquí encontrarás todo lo que necesitas para llevar tu pasión al siguiente nivel.
            </Typography>
            <br />
            {!isLoggedIn && (
              <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: { xs: 'center', sm: 'flex-start', md: 'flex-start' } }}>
                <Button component={RouterLink} to="/register" variant="contained" style={{ backgroundColor: '#1AA197', color: 'white' }}>
                  Regístrate
                </Button>
                <Button component={RouterLink} to="/login" rel="noopener noreferrer" variant="contained" style={{ backgroundColor: '#7289DA', color: 'white' }}>
                  Inicio de sesión
                </Button>
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {ContactSection()}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Box sx={{ textAlign: 'center', display: {xs:'none', md:'inline-block',} }}>
            <img src={img1} alt="Gaming" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderSectionLeft;
