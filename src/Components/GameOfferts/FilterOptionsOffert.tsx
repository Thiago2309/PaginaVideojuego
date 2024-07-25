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
import { GameOffert } from "./dataOfferts";
import {
  developersOptions,
  categoriesOptions,
  platformsOptions,
  priceOptions,
  discountOptions,
} from "./helpersOfferts";

interface FilterOptionsProps {
  setFilteredGames: (games: GameOffert[]) => void;
  allGames: GameOffert[];
  selectedDevelopers: string[];
  setSelectedDevelopers: (developers: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedPlatforms: string[];
  setSelectedPlatforms: (platforms: string[]) => void;
  selectedRanges: string[];
  setSelectedRanges: (ranges: string[]) => void;
  selectedPrice: { value: string; label: string }[];
  setSelectedPrice: (price: { value: string; label: string }[]) => void;
  selectedDiscount: { value: string; label: string }[];
  setSelectedDiscount: (discount: { value: string; label: string }[]) => void;
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

const FilterOptionsOff: React.FC<FilterOptionsProps> = ({
  setFilteredGames,
  allGames,
  selectedDevelopers,
  setSelectedDevelopers,
  selectedCategories,
  setSelectedCategories,
  selectedPlatforms,
  setSelectedPlatforms,
  selectedRanges,
  setSelectedRanges,
  selectedPrice,
  setSelectedPrice,
  selectedDiscount,
  setSelectedDiscount,
}) => {
  const [open, setOpen] = useState(false);

  // Temporary states for filters
  const [tempDevelopers, setTempDevelopers] = useState<string[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempPlatforms, setTempPlatforms] = useState<string[]>([]);
  const [tempPrice, setTempPrice] = useState<
    { value: string; label: string }[]
  >([]);
  const [tempDiscount, setTempDiscount] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const filteredGames = allGames.filter((game) => {
      const matchDevelopers =
        selectedDevelopers.length === 0 ||
        selectedDevelopers.some((developer) =>
          game.desarrollador
            .split(",")
            .map((d) => d.trim())
            .includes(developer)
        );
      const matchCategories =
        selectedCategories.length === 0 ||
        selectedCategories.every((category) => game.genero.includes(category));
      const matchPlatforms =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.every((platform) =>
          game.plataforma.includes(platform)
        );
      const matchPrice =
        selectedPrice.length === 0 ||
        selectedPrice.some((priceRange) => {
          if (priceRange.value === "1001-") {
            return game.precio >= 1001;
          } else {
            const [min, max] = priceRange.value.split("-").map(Number);
            return game.precio >= min && game.precio <= max + 0.99;
          }
        });
      const matchDiscount =
        selectedDiscount.length === 0 ||
        selectedDiscount.some((discountRange) => {
          const [min, max] = discountRange.value.split("-").map(Number);
          return game.descuento >= min && game.descuento <= max;
        });

      return (
        matchDevelopers &&
        matchCategories &&
        matchPlatforms &&
        matchPrice &&
        matchDiscount
      );
    });
    setFilteredGames(filteredGames);
  }, [
    selectedDevelopers,
    selectedCategories,
    selectedPlatforms,
    selectedPrice,
    selectedDiscount,
    setFilteredGames,
    allGames,
  ]);

  const handleClickOpen = () => {
    setTempDevelopers(selectedDevelopers);
    setTempCategories(selectedCategories);
    setTempPlatforms(selectedPlatforms);
    setTempPrice(selectedPrice);
    setTempDiscount(selectedDiscount);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedDevelopers(tempDevelopers);
    setSelectedCategories(tempCategories);
    setSelectedPlatforms(tempPlatforms);
    setSelectedPrice(tempPrice);
    setSelectedDiscount(tempDiscount);
    handleClose();
  };

  const handleClearFilters = () => {
    setTempDevelopers([]);
    setTempCategories([]);
    setTempPlatforms([]);
    setTempPrice([]);
    setTempDiscount([]);
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
                  onChange={(event, newValue) => setTempDevelopers(newValue)}
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
                  onChange={(event, newValue) => setTempCategories(newValue)}
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
                  options={priceOptions}
                  getOptionLabel={(option) => option.label}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Rango de Precios"
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
                  onChange={(event, newValue) => setTempPrice(newValue)}
                  value={tempPrice}
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
                  options={discountOptions}
                  getOptionLabel={(option) => option.label}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Rango de Descuentos"
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
                  onChange={(event, newValue) => setTempDiscount(newValue)}
                  value={tempDiscount}
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
              onClick={handleClearFilters}
              variant="contained"
              color="secondary"
            >
              Borrar Filtros
            </Button>
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

export default React.memo(FilterOptionsOff);
