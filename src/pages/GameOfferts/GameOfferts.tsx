import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import SearchBarOff from "../../Components/GameOfferts/SearchBarOff";
import FilterOptionsOff from "../../Components/GameOfferts/FilterOptionsOffert";
import SortOptionsOff from "../../Components/GameOfferts/SortOptionsOffert";
import Navegador from "../../layout/Navegador/Navegador";
import FooterView from "../../layout/Footer/FooterView";
import { useNavigate } from "react-router-dom";
import GameCardOff from "../../Components/GameOfferts/GameCardOffert";
import { GameOffert } from "../../Components/GameOfferts/dataOfferts";
import { getOfertas } from "../../services/api";
import noResultsImage from "../../assets/images/GameCatalog/noResultsImage.png";

interface PriceOption {
  value: string;
  label: string;
}

interface DiscountOption {
  value: string;
  label: string;
}

const GameOfferts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allGames, setAllGames] = useState<GameOffert[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameOffert[]>([]);
  const [sort, setSort] = useState<string>("title-asc");
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<PriceOption[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountOption[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOfertas();
      const dataWithLikes = data.map((game: GameOffert) => ({
        ...game,
        likes: Math.floor(Math.random() * 1000), // Asigna un valor estático o aleatorio a likes
      }));
      setAllGames(dataWithLikes);
      setFilteredGames(dataWithLikes);
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  const searchedGames = filteredGames.filter(
    (game) =>
      game.nombre && game.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedGames = searchedGames.sort((a, b) => {
    const [key, order] = sort.split("-");
    let comparison = 0;

    if (key === "title") {
      comparison = a.nombre.localeCompare(b.nombre);
    } else if (key === "releaseDate") {
      comparison =
        new Date(a.fecha_Lanzamiento).getTime() - new Date(b.fecha_Lanzamiento).getTime();
    } else if (key === "discount") {
      comparison = a.descuento - b.descuento;
    } else if (key === "price") {
      comparison = a.precio - b.precio;
    } else if (key === "likes") {
      comparison = (a.likes || 0) - (b.likes || 0); // Usar un valor por defecto para likes
    }

    return order === "asc" ? comparison : -comparison;
  });

  const handleFilteredGames = (games: GameOffert[]) => {
    setFilteredGames(games);
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
          Catálogo de ofertas
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
              <SearchBarOff
                games={allGames}
                setFilteredGames={setFilteredGames}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Box>
            <Box sx={{ ml: 1, mt: { sm: 0 } }}>
            <FilterOptionsOff
                setFilteredGames={handleFilteredGames}
                allGames={allGames}
                selectedDevelopers={selectedDevelopers}
                setSelectedDevelopers={setSelectedDevelopers}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPlatforms={selectedPlatforms}
                setSelectedPlatforms={setSelectedPlatforms}
                selectedRanges={selectedRanges}
                setSelectedRanges={setSelectedRanges}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                selectedDiscount={selectedDiscount}
                setSelectedDiscount={setSelectedDiscount}
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
            <SortOptionsOff sort={sort} setSort={setSort} />
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
                <GameCardOff game={game} />
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

export default GameOfferts;
