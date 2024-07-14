import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import SearchBar from "../../Components/GameCommunity/SearchBarCommunity";
import SortOptions from "../../Components/GameCommunity/SortOptionsCommunity";
import Navegador from "../../layout/Navegador/Navegador";
import FooterView from "../../layout/Footer/FooterView";
import { useNavigate } from "react-router-dom";
import GameCard from "../../Components/GameCommunity/GameCardCommunity";
import Publications from "../../Components/GameCommunity/PublicationCommunity";
import { communitygame, CommunityGame } from "../../Components/GameCommunity/dataCommunity";
import noResultsImage from "../../assets/images/GameCatalog/noResultsImage.png";

const GameCommunity: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCommunityGame, setFilteredCommunityGame] = useState<CommunityGame[]>(communitygame);
  const [noResults, setNoResults] = useState(false);
  const [sort, setSort] = useState<string>("title-asc");

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSearch = (searchTerm: string) => {
    const results = communitygame.filter((communitygame) =>
      communitygame.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCommunityGame(results);
    setNoResults(results.length === 0);
  };

  useEffect(() => {
    setFilteredCommunityGame(communitygame);
  }, [communitygame]);

  const sortedCommunityGame = filteredCommunityGame.sort((a, b) => {
    const [key, order] = sort.split("-");
    let comparison = 0;

    if (key === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (key === "releaseDate") {
      comparison = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
    } else if (key === "likes") {
      comparison = a.likes - b.likes;
    }

    return order === "asc" ? comparison : -comparison;
  });

  // Nueva función para manejar la adición de publicaciones
  const handleAddPublication = (newPublication: CommunityGame) => {
    communitygame.push(newPublication);
    handleSearch(searchTerm); // Actualiza los resultados de búsqueda
  };

  return (
    <Grid>
      <Navegador />
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4, lg: 20, xl: 20 },
          pt: { xs: 2, sm: 3, md: 3, lg: 3, xl: 3 },
        }}
      >
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
                communitygame={communitygame}
                setFilteredCommunityGame={setFilteredCommunityGame}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setNoResults={setNoResults}
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

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Publications onAddPublication={handleAddPublication} />
          </Grid>
        </Grid>
        
        {noResults && (
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
        {!noResults && sortedCommunityGame.length > 0 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {sortedCommunityGame.map((communitygame) => (
              <Grid
                item
                key={communitygame.id || communitygame.title}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <GameCard communitygame={communitygame} />
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
