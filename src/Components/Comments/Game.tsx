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
    <Card sx={{ backgroundColor: "#1C172B", width: "100%" }}>
      <CardContent sx={{ padding: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#ffffff" }}>
              {game.nombre}
            </Typography>
          </Grid>
          {/* Botón para volver (opcional) */}
          {/* <Grid item>
            <Button variant="contained" sx={{ backgroundColor: "#E10AAB", color: "#ffffff" }} onClick={handleBackClick}>
              Volver
            </Button>
          </Grid> */}
        </Grid>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, color: "#ffffff", textAlign: "left" }}>
          Fecha de lanzamiento {game.fecha_Lanzamiento}  Publicado por {game.rolNombre}
        </Typography>

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
