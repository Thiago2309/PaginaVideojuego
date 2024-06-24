import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FaInstagram, FaDiscord, FaFacebook } from 'react-icons/fa';
import logo from "../../assets/images/logo.png"; 

const FooterView = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'relative',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#221141',
        color: '#d6dfed',
        padding: '40px 0',
        mt: 'auto',
      }}
    >
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Link
            component={RouterLink}
            to="#"
            sx={{ color: '#d6dfed', textDecoration: 'none', mx: 1 }}
          >
            Populares
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to="#"
            sx={{ color: '#d6dfed', textDecoration: 'none', mx: 1 }}
          >
            Ofertas
          </Link>
        </Grid>
        <Grid item>
          <img src={logo} alt="Logo" style={{ maxWidth: 120 }} /> 
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to="#"
            sx={{ color: '#d6dfed', textDecoration: 'none', mx: 1 }}
          >
            Novedades
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to="#"
            sx={{ color: '#d6dfed', textDecoration: 'none', mx: 1 }}
          >
            Nosotros
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ mt: 3 }}>
        © 2024 Derechos reservados BitPlay UT Cancún
      </Typography>
      <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Link
            href="https://instagram.com" 
            sx={{ color: '#d6dfed', textDecoration: 'none', mx: 1 }}
          >
            <FaInstagram size={24} />
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="https://discord.com" 
            sx={{ color: '#d6dfed', textDecoration: 'none', mx: 1 }}
          >
            <FaDiscord size={24} />
          </Link>
        </Grid>
        <Grid item>
          <Link
            href="https://facebook.com" 
            sx={{ color: '#d6dfed', textDecoration: 'none', mx: 1 }}
          >
            <FaFacebook size={24} />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterView;
