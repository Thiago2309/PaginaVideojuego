// SearchBarForModal.tsx
import React, { useState, useEffect, useCallback } from "react";
import { TextField, Autocomplete, Box } from "@mui/material";
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
          />
        )}
      />
    </Box>
  );
};

export default React.memo(SearchBarForModal);
