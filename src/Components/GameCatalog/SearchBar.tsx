import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { Game } from "../../store/reducers/videojuegosReducer";

const filter = createFilterOptions<Game>({
  stringify: (option) => option.nombre,
});

interface SearchBarProps {
  games: Game[];
  setFilteredGames: (games: Game[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ games, setFilteredGames, searchTerm, setSearchTerm }) => {
  const [value, setValue] = React.useState<Game | null>(null);
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleSearch = () => {
    if (!inputValue) {
      setFilteredGames(games);
    } else if (value && value.nombre) {
      setFilteredGames([value]);
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
          setValue(newValue as Game);
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
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.nombre
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              nombre: inputValue,
            } as Game);
          }
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
          <li {...props} key={option.nombre}>
            {typeof option === "string" ? option : option.nombre}
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

export default SearchBar;
