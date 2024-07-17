import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navegador from "../../layout/Navegador/Navegador";
import Games from "../../Components/Comments/Game";
import GameApprobation from "../../Components/Comments/GameApprobation";
import FooterView from "../../layout/Footer/FooterView";
import axios from "axios";
import { Game, fetchGamesFailure } from "../../store/reducers/videojuegosReducer";
import { User } from '../../store/reducers/userReducer';
import { useDispatch } from "react-redux";
import imagen_default from "../../assets/images/banner_default.jpg"; // Importar la imagen por defecto

const GameDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const handleBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameResponse = await axios.get(`https://localhost:7029/Videojuegos/${id}`);
        const gameData = gameResponse.data.result;
        setGame(gameData);
        if (gameData.userId) {
          const userResponse = await axios.get(`https://localhost:7029/Usuarios/${gameData.userId}`);
          const userData = userResponse.data.result;
          setUser(userData);
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch(fetchGamesFailure(error.message));
        } else {
          dispatch(fetchGamesFailure('Unknown error occurred'));
        }
      }
    };

    fetchData();
  }, [id, dispatch]);

  if (!game) {
    return <div>Loading...</div>; 
  }
  const formattedDate = new Date(game.fecha_Lanzamiento).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
  
  const imagePath = game.foto_Url || imagen_default; // Usar imagen por defecto si no hay foto_Url

  // Asegurarse de que 'plataforma' sea un array
  const plataformasArray = Array.isArray(game.plataforma) ? game.plataforma : game.plataforma.split(", ");

  const selectedGame = {
    nombre: game.nombre,
    desarollador: game.desarrollador,
    calificacion: game.calificacion,
    plataforma: plataformasArray,
    fecha_Lanzamiento: formattedDate,
    genero: game.genero.split(","),
    description: game.descripcion,
    foto_Url: imagePath,
    usuarioNombre: user?.usuarioNombre ?? "Desconocido",
    rolNombre: user?.rol?.nombre ?? "Desconocido",
  };

  return (
    <div>
      <Navegador />
      <Box sx={{ flexGrow: 1, p: 3, mx: { xs: 2, sm: 3, md: 5, lg: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box sx={{ height: '100%' }}>
              <Games game={selectedGame} handleBackClick={handleBackClick} />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ height: '100%' }}>
              <GameApprobation game={selectedGame} handleBackClick={handleBackClick} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
        {FooterView()}
      </Box>
    </div>
  );
};

export default GameDetails;
