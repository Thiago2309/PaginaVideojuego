import React from 'react';
import { Card, CardContent, Grid, Typography, Box, Chip } from '@mui/material';

interface GameProps {
  game: {
    nombre: string;
    fecha_Lanzamiento: string;
    genero: string[];
    description: string;
    foto_Url: string;
    usuarioNombre: string;
    rolNombre: string;
  };
  handleBackClick: () => void;
}

const Games: React.FC<GameProps> = ({ game, handleBackClick }) => {
  return (
    <Card sx={{ backgroundColor: "#1C172B", height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ padding: 4, flexGrow: 1 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#ffffff" }}>
              {game.nombre}
            </Typography>
          </Grid>
        </Grid>
        <CardContent sx={{ display: "flex", justifyContent: "space-between", color: "#ffffff", p: 0, marginTop: 1 }}>
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            Fecha de lanzamiento: {game.fecha_Lanzamiento}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            Publicado por: {game.rolNombre}
          </Typography>
        </CardContent>
        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {game.genero.map((genre, index) => (
              <Chip
                key={index}
                label={genre}
                sx={{
                  backgroundColor: "#2C2839",
                  color: "#ffffff",
                  borderRadius: 3,
                  mr: 1,
                }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ mt: 2, borderRadius: 3, overflow: "hidden" }}>
          <img src={game.foto_Url} alt={`foto_Url ${game.nombre}`} style={{ width: "100%" }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Games;
