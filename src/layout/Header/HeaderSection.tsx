import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import img1 from '../../img/controlL.png';

const HeaderSectionLeft = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4, color: 'white' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={12} lg={6}>
          <Box>
            <Typography variant="h3" gutterBottom sx={{ textAlign: 'left' }}>
              ¡Bienvenidos al Epicentro 
              de los Videojuegos!
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante faucibus orci 
              luctus et ultrices posuere cubilia Curae; Integer nec metus eget nisi hendrerit feugiat,
              luctus et ultrices posuere cubilia Curae.
            </Typography>
            <br />
            <Box sx={{ display: 'flex' , gap: '1rem'}}>
            <Button variant="contained" style={{ backgroundColor: '#1AA197', color: 'white' }}>
                Regístrate
            </Button>
            <Button variant="contained" color="primary">
              Discord
            </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Box sx={{ textAlign: 'center' }}>
            <img src={img1} alt="Gaming" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderSectionLeft;