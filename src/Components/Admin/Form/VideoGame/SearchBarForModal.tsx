import React, { useState, useEffect, useCallback } from "react";
import { TextField, Autocomplete, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchGames, getGameDetails, getGameScreenshots } from "./../../../../services/apiRAWG";
import { Game } from "./dataApi";
import debounce from 'lodash/debounce';

interface SearchBarForModalProps {
  onSelectGame: (game: Partial<Game>) => void;
}

const SearchBarForModal: React.FC<SearchBarForModalProps> = ({ onSelectGame }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Game[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGames = useCallback(
    debounce(async (query: string) => {
      setIsLoading(true);
      const games = await searchGames(query);
      setOptions(games);
      setIsLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    if (inputValue) {
      fetchGames(inputValue);
    } else {
      setOptions([]);
      setOpen(false);
    }
  }, [inputValue, fetchGames]);

  const handleSelectGame = useCallback(async (game: Game) => {
    setIsLoading(true);
    const gameDetails = await getGameDetails(game.id);
    const screenshots = await getGameScreenshots(game.id);

    const fullGameDetails = {
      ...gameDetails,
      screenshots: screenshots.map((screenshot: any) => ({ id: screenshot.id, image: screenshot.image })),
    };

    onSelectGame(fullGameDetails);
    setInputValue(fullGameDetails.name);
    setOpen(false);
    setIsLoading(false);
  }, [onSelectGame]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && options.length > 0) {
      handleSelectGame(options[0]);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
      <Autocomplete
        value={null}
        open={open}
        onClose={() => setOpen(false)}
        onChange={(event, newValue) => {
          if (newValue) {
            handleSelectGame(newValue as Game);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (newInputValue) {
            setOpen(true);
          } else {
            setOpen(false);
          }
        }}
        options={options}
        getOptionLabel={(option) => option.name}
        loading={isLoading}
        sx={{ flexGrow: 1 }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar juegos"
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
        onClick={() => {
          setInputValue('');
          setOpen(false);
        }}
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

export default React.memo(SearchBarForModal);
