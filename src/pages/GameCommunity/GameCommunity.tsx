// GameCatalog.tsx
import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import SearchBar from "../../Components/GameCommunity/SearchBarCommunity";
import FilterOptions from "../../Components/GameCommunity/FilterOptionsCommunity";
import SortOptions from "../../Components/GameCommunity/SortOptionsCommunity";
import Navegador from "../../layout/Navegador/Navegador";
import FooterView from "../../layout/Footer/FooterView";
import { useNavigate } from "react-router-dom";
import GameCard from "../../Components/GameCommunity/GameCardCommunity";
import { games as initialGames, Game } from "../../Components/GameCommunity/dataCommunity";
import noResultsImage from "../../assets/images/GameCatalog/noResultsImage.png";

const GameCommunity: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredGames, setFilteredGames] = useState<Game[]>(initialGames);
  const [sort, setSort] = useState<string>("title-asc");
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const searchedGames = filteredGames.filter(
    (game) =>
      game.title && game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedGames = searchedGames.sort((a, b) => {
    const [key, order] = sort.split("-");
    let comparison = 0;

    if (key === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (key === "releaseDate") {
      comparison =
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
    } else if (key === "likes") {
      comparison = a.likes - b.likes;
    }

    return order === "asc" ? comparison : -comparison;
  });

  const handleFilteredGames = (games: Game[]) => {
    if (games.length === 0) {
      setFilteredGames([]);
    } else {
      setFilteredGames(games);
    }
  };

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
          Comunidad
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
                games={initialGames}
                setFilteredGames={setFilteredGames}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Box>
            <Box sx={{ ml: 1, mt: { sm: 0 } }}>
              <FilterOptions
                setFilteredGames={handleFilteredGames}
                games={initialGames}
                selectedDevelopers={selectedDevelopers}
                setSelectedDevelopers={setSelectedDevelopers}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPlatforms={selectedPlatforms}
                setSelectedPlatforms={setSelectedPlatforms}
                selectedRanges={selectedRanges}
                setSelectedRanges={setSelectedRanges}
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
                key={game.id || game.title}
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

export default GameCommunity;
