import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import img1 from '../../assets/images/controlL.png';
import ContactSection from '../Contact/ContactSection';

const HeaderSectionLeft = () => {
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante faucibus orci 
              luctus et ultrices posuere cubilia Curae; Integer nec metus eget nisi hendrerit feugiat,
              luctus et ultrices posuere cubilia Curae.
            </Typography>
            <br />
            <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: { xs: 'center', sm: 'flex-start', md: 'flex-start' } }}>
              <Button variant="contained" style={{ backgroundColor: '#1AA197', color: 'white' }}>
                Regístrate
              </Button>
              <Button variant="contained" style={{ backgroundColor: '#7289DA', color: 'white' }}>
                Discord
              </Button>
            </Box>
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
