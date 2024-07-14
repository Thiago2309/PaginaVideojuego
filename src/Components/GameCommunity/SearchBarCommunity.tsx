import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { CommunityGame } from "./dataCommunity";

const filter = createFilterOptions<CommunityGame>({
  stringify: (option) => option.title,
});

interface SearchBarProps {
  communitygame: CommunityGame[];
  setFilteredCommunityGame: (communitygame: CommunityGame[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setNoResults: (noResults: boolean) => void; // Añadimos este prop
}

const SearchBar: React.FC<SearchBarProps> = ({
  communitygame,
  setFilteredCommunityGame,
  searchTerm,
  setSearchTerm,
  setNoResults,
}) => {
  const [value, setValue] = React.useState<CommunityGame | null>(null);
  const [inputValue, setInputValue] = React.useState<string>(searchTerm);

  const handleSearch = () => {
    const searchQuery = inputValue.trim();
    if (!searchQuery) {
      setFilteredCommunityGame(communitygame); // Si no hay valor en el input, muestra todos los juegos
      setNoResults(false);
      return;
    }

    const filteredCommunityGame = communitygame.filter((communitygame) =>
      communitygame.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCommunityGame(filteredCommunityGame);
    setSearchTerm(searchQuery);
    setNoResults(filteredCommunityGame.length === 0); // Actualiza el estado de noResults
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue as CommunityGame); // Asigna el nuevo valor solo si es del tipo Game
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (newInputValue === "") {
            setValue(null); // Reinicia el valor si el input está vacío
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              title: inputValue,
            } as CommunityGame); // Asegura que el nuevo objeto sea del tipo Game
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={communitygame} // Usa tus juegos aquí
        getOptionLabel={(option) => {
          // Asegura que TypeScript entiende que `option` es del tipo `Game`
          if (typeof option === "string") {
            return option;
          }
          return option.title;
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.title}>
            {typeof option === "string" ? option : option.title}
          </li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar publicación"
            variant="outlined"
            size="small"
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                color: "white",
              },
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
                "& .MuiAutocomplete-endAdornment": {
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
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
