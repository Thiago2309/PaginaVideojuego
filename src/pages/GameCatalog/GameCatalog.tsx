import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import SearchBar from "../../Components/GameCatalog/SearchBar";
import FilterOptions from "../../Components/GameCatalog/FilterOptions";
import SortOptions from "../../Components/GameCatalog/SortOptions";
import Navegador from "../../layout/Navegador/Navegador";
import FooterView from "../../layout/Footer/FooterView";
import { useNavigate } from "react-router-dom";
import GameCard from "../../Components/GameCatalog/GameCard";
import noResultsImage from "../../assets/images/GameCatalog/noResultsImage.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store/store";
import { fetchGamesStart, fetchGamesSuccess, fetchGamesFailure, Game } from "../../store/reducers/videojuegosReducer";

const GameCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("nombre-asc");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.videojuegos.games);
  const loading = useSelector((state: RootState) => state.videojuegos.loading);
  const error = useSelector((state: RootState) => state.videojuegos.error);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        dispatch(fetchGamesStart());
        const response = await axios.get("https://localhost:7029/Videojuegos/ObtenerVideojuegos");
        dispatch(fetchGamesSuccess(response.data.result));
      } catch (error: any) {
        dispatch(fetchGamesFailure(error.message));
      }
    };

    fetchGames();
  }, [dispatch]);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const searchedGames = filteredGames.filter(
    (game) => game.nombre && game.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedGames = searchedGames.sort((a, b) => {
    const [key, order] = sort.split("-");
    let comparison = 0;

    if (key === "nombre") {
      comparison = a.nombre.localeCompare(b.nombre);
    } else if (key === "fecha_Lanzamiento") {
      comparison = new Date(a.fecha_Lanzamiento).getTime() - new Date(b.fecha_Lanzamiento).getTime();
    } else if (key === "calificacion") {
      comparison = a.calificacion - b.calificacion;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return (
    <Grid>
      <Navegador />

      <Box sx={{ padding: 4, paddingTop: 1 }}>
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 45,
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          Catálogo de juegos
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Box sx={{ minWidth: "200px" }}>
              <SearchBar
                games={games}
                setFilteredGames={setFilteredGames}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Box>
            <Box sx={{ ml: 1, mt: { sm: 0 } }}>
              <FilterOptions
                setFilteredGames={setFilteredGames}
                allGames={games}
                selectedDevelopers={selectedDevelopers}
                setSelectedDevelopers={setSelectedDevelopers}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPlatforms={selectedPlatforms}
                setSelectedPlatforms={setSelectedPlatforms}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end", md: "flex-end" },
            }}
          >
            <SortOptions sort={sort} setSort={setSort} />
          </Grid>
        </Grid>
        {sortedGames.length === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt={4}
            sx={{ textAlign: "center", minHeight: "50vh" }}
          >
            <img
              src={noResultsImage}
              alt="No results found"
              style={{ maxWidth: "25%", height: "auto" }}
            />
            <Typography variant="h4" component="h2" mt={2} fontWeight="bold">
              No se encontraron resultados
            </Typography>
            <Typography variant="h6" mt={1}>
              Intenta usar otras palabras clave o quitar los filtros de búsqueda
            </Typography>
          </Box>
        )}
        {sortedGames.length > 0 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {sortedGames.map((game) => (
              <Grid
                item
                key={game.id || game.nombre}
                xs={6}
                sm={3}
                md={3}
                lg={2}
              >
                <GameCard game={game} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          justifyContent: "center",
        }}
      >
        {FooterView()}
      </Box>
    </Grid>
  );
};

export default GameCatalog;
