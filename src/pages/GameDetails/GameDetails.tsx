import React, {useEffect, useState} from "react";
import {Grid, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navegador from "../../layout/Navegador/Navegador";
import Games from "../../Components/Comments/Game";
import GameApprobation from "../../Components/Comments/GameApprobation";
import FooterView from "../../layout/Footer/FooterView";
import { useParams } from "react-router-dom";
import { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure, Game } from "../../store/reducers/videojuegosReducer"; 
import { useDispatch, useSelector } from "react-redux";
import { User } from '../../store/reducers/userReducer';
import axios from "axios";
import { RootState } from "../../store/store";

const BannerGame = require.context("../../assets/images", true);

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
        // Obtener datos del juego
        const gameResponse = await axios.get(`https://localhost:7029/Videojuegos/${id}`);
        const gameData = gameResponse.data.result;
        setGame(gameData);
        if (gameData.userId) {
          const userResponse = await axios.get(`https://localhost:7029/Usuarios/${gameData.userId}`);
          const userData = userResponse.data.result;
          setUser(userData);
          // console.log("Los datos del usuario son: ", userData);
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Ejecutar el efecto solo cuando cambie el id
  
  if (!game) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }
  const formattedDate = new Date(game.fecha_Lanzamiento).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
  
  let imagePath = "";
  try {
    imagePath = BannerGame(`./${game.foto_Url}`);
    // console.log("Imagen:", imagePath);
  } catch (e) {
    // console.error("Error loading image:", e);
    imagePath = BannerGame(`./banner_default.jpg`); 
  }

  const selectedGame = {
    nombre: game.nombre,
    desarollador: game.desarrollador,
    calificacion: game.calificacion,
    plataforma: game.plataforma,
    fecha_Lanzamiento: formattedDate,
    genero: game.genero.split(","),
    description: game.descripcion,
    foto_Url: imagePath,
    usuarioNombre: user?.usuarioNombre ?? "Desconocido",
    rolNombre: user?.rol?.nombre ?? "Desconocido",
  };
  // console.log("El id es: ", id);

  return (
    <div>
      <Navegador />
      <Box sx={{ flexGrow: 1, p: 3, mx: { xs: 2, sm: 3, md: 5, lg: 4 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ height: '100%' }}>
              <Games game={selectedGame} handleBackClick={handleBackClick} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
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
