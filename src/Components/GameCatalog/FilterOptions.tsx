import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Game } from "../../store/reducers/videojuegosReducer";
import {
  developersOptions,
  categoriesOptions,
  platformsOptions,
} from "./helpers";

interface FilterOptionsProps {
  setFilteredGames: (games: Game[]) => void;
  allGames: Game[];
  selectedDevelopers: string[];
  setSelectedDevelopers: (developers: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "#1C172A",
  border: "none",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "90vh",
};

const FilterOptions: React.FC<FilterOptionsProps> = ({
  setFilteredGames,
  allGames,
  selectedDevelopers,
  setSelectedDevelopers,
  selectedCategories,
  setSelectedCategories,
  selectedPlatforms,
  setSelectedPlatforms,
}) => {
  const [open, setOpen] = useState(false);

  // Temporary states for filters
  const [tempDevelopers, setTempDevelopers] = useState<string[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempPlatforms, setTempPlatforms] = useState<string[]>([]);

  useEffect(() => {
    const filteredGames = allGames.filter((game) => {
      const matchDevelopers = selectedDevelopers.length === 0 || selectedDevelopers.some((developer) => game.desarrollador.includes(developer));
      const matchCategories = selectedCategories.length === 0 || selectedCategories.every((category) => game.genero.includes(category));
      const matchPlatforms = selectedPlatforms.length === 0 || selectedPlatforms.every((platform) => game.plataforma.includes(platform));

      return matchDevelopers && matchCategories && matchPlatforms;
    });
    setFilteredGames(filteredGames);
  }, [selectedDevelopers, selectedCategories, selectedPlatforms, setFilteredGames, allGames]);

  const handleClickOpen = () => {
    setTempDevelopers(selectedDevelopers);
    setTempCategories(selectedCategories);
    setTempPlatforms(selectedPlatforms);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedDevelopers(tempDevelopers);
    setSelectedCategories(tempCategories);
    setSelectedPlatforms(tempPlatforms);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        size="large"
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#14101F",
          minWidth: "auto",
          padding: "8px 8px",
          "&:hover": {
            backgroundColor: "#1E192D",
          },
        }}
      >
        <FilterListIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleFormSubmit} sx={style}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ color: "white" }}
          >
            Filtros de búsqueda
          </Typography>
          <Divider sx={{ mb: 2, backgroundColor: "white" }} />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={developersOptions(allGames)}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Desarrolladores"
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#A59898",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                          "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": { color: "white" },
                          "& .MuiChip-deleteIcon": { color: "white" },
                        },
                      }}
                    />
                  )}
                  onChange={(event, newValue) => setTempDevelopers(newValue)}
                  value={tempDevelopers}
                  sx={{
                    width: "100%",
                    "& .MuiChip-root": { backgroundColor: "#383446", color: "white" },
                    "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={categoriesOptions(allGames)}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categorías"
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#A59898",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white" },
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                          "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": { color: "white" },
                          "& .MuiChip-deleteIcon": { color: "white" },
                        },
                      }}
                    />
                  )}
                  onChange={(event, newValue) => setTempCategories(newValue)}
                  value={tempCategories}
                  sx={{
                    width: "100%",
                    "& .MuiChip-root": { backgroundColor: "#383446", color: "white" },
                    "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={platformsOptions(allGames)}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Plataformas"
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#A59898",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white" },
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                          "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": { color: "white" },
                          "& .MuiChip-deleteIcon": { color: "white" },
                        },
                      }}
                    />
                  )}
                  onChange={(event, newValue) => setTempPlatforms(newValue)}
                  value={tempPlatforms}
                  sx={{
                    width: "100%",
                    "& .MuiChip-root": { backgroundColor: "#383446", color: "white" },
                    "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            mt={2}
            display="flex"
            justifyContent="flex-end"
            sx={{ gap: "10px" }}
          >
            <Button
              type="button"
              onClick={handleClose}
              variant="contained"
              color="error"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Aplicar
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default FilterOptions;
