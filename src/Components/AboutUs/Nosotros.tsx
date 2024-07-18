import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  CardMedia,
  CardActionArea,
  Link
} from "@mui/material";
import { css, keyframes } from '@emotion/react';
import Footer from '../../layout/Footer/FooterView';
import Navegador from '../../layout/Navegador/Navegador';
import { VideogameAsset } from '@mui/icons-material';

const teamMembers = [
  { name: "Thiago", role: "Frontend Developer", icon: <VideogameAsset />, githubUrl: "https://github.com/Thiago2309" },
  { name: "Enrique", role: "Backend Developer", icon: <VideogameAsset />, githubUrl: "https://github.com/CahuichG17" },
  { name: "Lucas", role: "Frontend Developer", icon: <VideogameAsset />, githubUrl: "https://github.com/LucasZamoraSulub" },
  { name: "Daniel", role: "Backend Developer", icon: <VideogameAsset />, githubUrl: "https://github.com/LDGO23" },
];

const colorChangeAnimation = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  25% {
    filter: hue-rotate(90deg);
  }
  50% {
    filter: hue-rotate(180deg);
  }
  75% {
    filter: hue-rotate(270deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`;

const backgroundImageMovement = keyframes`
  0% {
    background-position: center;
  }
  50% {
    background-position: calc(50% + 10px) calc(50% + 10px);
  }
  100% {
    background-position: center;
  }
`;

const smoothAnimation = css`
  animation: ${backgroundImageMovement} 0.4s cubic-bezier(0.32, 0.04, 0.15, 0.97) infinite;
  will-change: background-position;
`;


const Nosotros: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const apiKey = "f440cc6f53ef461793a6427f1abc6020";
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);
        const games = response.data.results;
        const randomGame = games[Math.floor(Math.random() * games.length)];
        setBackgroundImage(randomGame.background_image);
      } catch (error) {
        console.error("Error al cargar la imagen de fondo:", error);
      }
    };

    fetchBackgroundImage();
  }, []);

  return (
    <>
      <Navegador />
      <Box sx={{
        position: 'relative',
        width: '100%',
        height: '50vh',
        backgroundColor: '#1C172B',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: `${colorChangeAnimation} 10s infinite linear, ${backgroundImageMovement} 20s infinite linear`
      }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#ffffff',
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textShadow: '2px 2px 4px #000000'
          }}>
          NOSOTROS
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            textAlign: 'center',
            margin: '45px',
            textShadow: '2px 2px 4px #000000'
          }}>
          Somos un equipo apasionado por los videojuegos, comprometidos con ofrecer la mejor información y calificaciones para ayudarte a tomar decisiones informadas.
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: "#2D2A32" }}>
              <Link href={member.githubUrl} target="_blank" style={{ textDecoration: 'none' }}>
                <CardActionArea>
                  <CardContent>
                    {member.icon}
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: "#ffffff" }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: "#ffffff" }}>
                      {member.role}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </>
  );
};

export default Nosotros;