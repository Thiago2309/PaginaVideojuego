import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { GameOffert } from "./dataOfferts";

const filter = createFilterOptions<GameOffert>({
  stringify: (option) => option.nombre,
});

interface SearchBarProps {
  games: GameOffert[];
  setFilteredGames: (games: GameOffert[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBarOff: React.FC<SearchBarProps> = ({ games, setFilteredGames, searchTerm, setSearchTerm }) => {
  const [value, setValue] = React.useState<GameOffert | null>(null);
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleSearch = () => {
    if (!inputValue) {
      setFilteredGames(games);
    } else {
      const filteredGames = games.filter((game) =>
        game.nombre && game.nombre.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredGames(filteredGames);
    }
    setSearchTerm(inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue as GameOffert);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (newInputValue === "") {
            setValue(null);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={games}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          return option.nombre;
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.nombre}
          </li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar juegos"
            variant="outlined"
            size="small"
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-outlined.MuiInputLabel-shrink": { color: "white" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "0px",
                borderBottomLeftRadius: "4px",
                borderTopLeftRadius: "4px",
                backgroundColor: "#383446",
                color: "white",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#14101F",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#14101F",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1e182e",
                },
                "& .MuiAutocomplete-endAdornment .MuiSvgIcon-root": {
                  color: "white",
                },
              },
            }}
          />
        )}
      />
      <Button
        size="large"
        variant="contained"
        onClick={handleSearch}
        sx={{
          backgroundColor: "#14101F",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: "none",
          minWidth: "auto",
          padding: "8px 8px",
          "&:hover": {
            backgroundColor: "#1E192D",
          },
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default React.memo(SearchBarOff);
