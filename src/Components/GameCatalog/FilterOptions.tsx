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
import { Game } from "./data";
import {
  developersOptions,
  categoriesOptions,
  platformsOptions,
  rangesOptions,
} from "./helpers";

interface FilterOptionsProps {
  setFilteredGames: (games: Game[]) => void;
  games: Game[];
  selectedDevelopers: string[];
  setSelectedDevelopers: (developers: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
  selectedRanges: string[];
  setSelectedRanges: (ranges: string[]) => void;
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
  games,
  selectedDevelopers,
  setSelectedDevelopers,
  selectedCategories,
  setSelectedCategories,
  selectedPlatforms,
  setSelectedPlatforms,
  selectedRanges,
  setSelectedRanges,
}) => {
  const [open, setOpen] = useState(false);

  // Estados temporales para los filtros
  const [tempDevelopers, setTempDevelopers] = useState<string[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempPlatforms, setTempPlatforms] = useState<string[]>([]);
  const [tempRanges, setTempRanges] = useState<string[]>([]);

  useEffect(() => {
    const filteredGames = games.filter((game) => {
      return (
        (selectedDevelopers.length === 0 ||
          selectedDevelopers.includes(game.developers)) &&
        (selectedCategories.length === 0 ||
          selectedCategories.every((category) =>
            game.categories.includes(category)
          )) &&
        (selectedPlatforms.length === 0 ||
          selectedPlatforms.every((platform) =>
            game.platforms.includes(platform)
          )) &&
        (selectedRanges.length === 0 || selectedRanges.includes(game.ranges))
      );
    });
    setFilteredGames(filteredGames);
  }, [
    selectedDevelopers,
    selectedCategories,
    selectedPlatforms,
    selectedRanges,
    setFilteredGames,
    games,
  ]);

  const handleClickOpen = () => {
    // Establecer los valores temporales a los valores actuales de los filtros
    setTempDevelopers(selectedDevelopers);
    setTempCategories(selectedCategories);
    setTempPlatforms(selectedPlatforms);
    setTempRanges(selectedRanges);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aplicar los filtros temporales a los filtros reales
    setSelectedDevelopers(tempDevelopers);
    setSelectedCategories(tempCategories);
    setSelectedPlatforms(tempPlatforms);
    setSelectedRanges(tempRanges);
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
                  options={developersOptions}
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
                        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#A59898",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                            color: "white",
                          },
                          "& .MuiChip-deleteIcon": { color: "white" },
                        },
                      }}
                    />
                  )}
                  onChange={(event, newValue) =>
                    setTempDevelopers(newValue)
                  }
                  value={tempDevelopers}
                  sx={{
                    width: "100%",
                    "& .MuiChip-root": {
                      backgroundColor: "#383446",
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={categoriesOptions}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categorias"
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#A59898",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                            color: "white",
                          },
                          "& .MuiChip-deleteIcon": { color: "white" },
                        },
                      }}
                    />
                  )}
                  onChange={(event, newValue) =>
                    setTempCategories(newValue)
                  }
                  value={tempCategories}
                  sx={{
                    width: "100%",
                    "& .MuiChip-root": {
                      backgroundColor: "#383446",
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={platformsOptions}
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
                        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#A59898",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                            color: "white",
                          },
                          "& .MuiChip-deleteIcon": { color: "white" },
                        },
                      }}
                    />
                  )}
                  onChange={(event, newValue) => setTempPlatforms(newValue)}
                  value={tempPlatforms}
                  sx={{
                    width: "100%",
                    "& .MuiChip-root": {
                      backgroundColor: "#383446",
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={rangesOptions}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Rangos"
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-root": {
                          color: "white",
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#A59898",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                          },
                          "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                            color: "white",
                          },
                        },
                      }}
                    />
                  )}
                  onChange={(event, newValue) =>
                    setTempRanges(newValue.map((item) => item.title))
                  }
                  value={rangesOptions.filter((option) =>
                    tempRanges.includes(option.title)
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option.title}
                        style={{
                          backgroundColor: option.color,
                          color: "white",
                        }}
                        label={option.title}
                      />
                    ))
                  }
                  sx={{
                    width: "100%",
                    "& .MuiChip-root": { color: "white" },
                    "& .MuiOutlinedInput-root": { borderRadius: "4px" },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancelar
            </Button>
            <Button
              type="submit"
              sx={{ ml: 2 }}
              variant="contained"
              color="primary"
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default FilterOptions;