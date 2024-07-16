import React, { useState } from "react";
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel, Card, CardContent } from "@mui/material";
import SearchBar from "./GameSearch";
import { Game, Screenshot } from "./dataApi";

const GameForm: React.FC = () => {
  const [game, setGame] = useState<Partial<Game>>({});
  const [selectedScreenshots, setSelectedScreenshots] = useState<number[]>([]);
  const [savedGames, setSavedGames] = useState<Partial<Game>[]>([]);

  const handleSelectGame = (selectedGame: any) => {
    setGame({
      id: selectedGame.id,
      name: selectedGame.name,
      released: selectedGame.released,
      background_image: selectedGame.background_image,
      description_raw: selectedGame.description_raw,
      genres: selectedGame.genres,
      platforms: selectedGame.platforms,
      developers: selectedGame.developers,
      publishers: selectedGame.publishers,
      rating: selectedGame.rating,
      ratings_count: selectedGame.ratings_count,
      metacritic: selectedGame.metacritic,
      tags: selectedGame.tags,
      screenshots: selectedGame.screenshots,
    });
    setSelectedScreenshots([]); // Restablecer capturas de pantalla seleccionadas
  };

  const handleScreenshotToggle = (id: number) => {
    setSelectedScreenshots((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((screenshotId) => screenshotId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSave = () => {
    const selectedScreenshotsData = game.screenshots?.filter(screenshot =>
      selectedScreenshots.includes(screenshot.id)
    ) || [];

    const gameToSave = {
      ...game,
      screenshots: selectedScreenshotsData
    };

    setSavedGames([...savedGames, gameToSave]);
    console.log("Saved Games:", [...savedGames, gameToSave]);

    // Clear the form
    setGame({});
    setSelectedScreenshots([]);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <Card sx={{ maxWidth: 800, width: '100%', backgroundColor: 'white' }}>
        <CardContent>
          <SearchBar onGamesFetched={() => {}} onSelectGame={handleSelectGame} />
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Nombre del Juego"
              variant="outlined"
              fullWidth
              value={game.name || ""}
              onChange={(e) => setGame({ ...game, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Fecha de Lanzamiento"
              variant="outlined"
              fullWidth
              value={game.released || ""}
              onChange={(e) => setGame({ ...game, released: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={game.description_raw || ""}
              onChange={(e) => setGame({ ...game, description_raw: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Géneros"
              variant="outlined"
              fullWidth
              value={game.genres?.map((genre) => genre.name).join(", ") || ""}
              onChange={(e) => setGame({ ...game, genres: e.target.value.split(", ").map(name => ({ name })) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="URL de la Imagen"
              variant="outlined"
              fullWidth
              value={game.background_image || ""}
              onChange={(e) => setGame({ ...game, background_image: e.target.value })}
              sx={{ mb: 2 }}
            />
            {game.background_image && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img src={game.background_image} alt={game.name} style={{ maxWidth: "100%", height: "auto" }} />
              </Box>
            )}
            {game.screenshots && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", mb: 2 }}>
                {game.screenshots.map((screenshot) => (
                  <Box key={screenshot.id} sx={{ position: "relative", width: "200px" }}>
                    <img src={screenshot.image} alt={`Screenshot ${screenshot.id}`} style={{ width: "100%", height: "auto" }} />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedScreenshots.includes(screenshot.id)}
                          onChange={() => handleScreenshotToggle(screenshot.id)}
                          sx={{ position: "absolute", top: 0, left: 0, color: "white" }}
                        />
                      }
                      label=""
                    />
                  </Box>
                ))}
              </Box>
            )}
            <TextField
              label="Plataformas"
              variant="outlined"
              fullWidth
              value={game.platforms?.map((platform) => platform.platform.name).join(", ") || ""}
              onChange={(e) => setGame({ ...game, platforms: e.target.value.split(", ").map(name => ({ platform: { name } })) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Desarrolladores"
              variant="outlined"
              fullWidth
              value={game.developers?.map((developer) => developer.name).join(", ") || ""}
              onChange={(e) => setGame({ ...game, developers: e.target.value.split(", ").map(name => ({ name })) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Editores"
              variant="outlined"
              fullWidth
              value={game.publishers?.map((publisher) => publisher.name).join(", ") || ""}
              onChange={(e) => setGame({ ...game, publishers: e.target.value.split(", ").map(name => ({ name })) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Calificación"
              variant="outlined"
              fullWidth
              value={game.rating || ""}
              onChange={(e) => setGame({ ...game, rating: parseFloat(e.target.value) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Número de Calificaciones"
              variant="outlined"
              fullWidth
              value={game.ratings_count || ""}
              onChange={(e) => setGame({ ...game, ratings_count: parseInt(e.target.value) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Puntuación Metacritic"
              variant="outlined"
              fullWidth
              value={game.metacritic || ""}
              onChange={(e) => setGame({ ...game, metacritic: parseInt(e.target.value) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Etiquetas"
              variant="outlined"
              fullWidth
              value={game.tags?.map((tag) => tag.name).join(", ") || ""}
              onChange={(e) => setGame({ ...game, tags: e.target.value.split(", ").map(name => ({ name })) })}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
              Guardar Juego
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GameForm;
