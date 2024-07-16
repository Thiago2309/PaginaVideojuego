import React, { useState, useCallback, useMemo } from "react";
import { TextField, Button, Box, Card, CardContent, MenuItem, Select, InputLabel, FormControl, CircularProgress, Checkbox, FormControlLabel } from "@mui/material";
import SearchBar from "./GameOfferSearch";
import { Deal, SavedDeal } from "./dataApiOffert";
import { getGameDetails, searchGames, getGameScreenshots } from "./../../services/apiRAWG";
import { Game, Screenshot } from "../Admin/Form/VideoGame/dataApi";

const AdminAddOfferForm: React.FC = () => {
  const [deal, setDeal] = useState<Partial<Deal>>({});
  const [offers, setOffers] = useState<Deal[]>([]);
  const [savedDeals, setSavedDeals] = useState<Partial<SavedDeal>[]>([]);
  const [link, setLink] = useState<string>("");
  const [rawgData, setRawgData] = useState<Partial<Game> | null>(null);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [selectedScreenshots, setSelectedScreenshots] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectDeal = useCallback((selectedDeal: Deal) => {
    setDeal({
      dealID: selectedDeal.dealID,
      title: selectedDeal.title,
      normalPrice: selectedDeal.normalPrice,
      salePrice: selectedDeal.salePrice,
      thumb: selectedDeal.thumb,
      metacriticLink: selectedDeal.metacriticLink,
      storeID: selectedDeal.storeID,
      storeName: selectedDeal.storeName,
    });
    setLink(`https://www.cheapshark.com/redirect?dealID=${selectedDeal.dealID}`);
    setRawgData(null);
    setScreenshots([]);
    fetchRAWGData(selectedDeal.title);
  }, []);

  const fetchRAWGData = useCallback(async (title: string) => {
    setLoading(true);
    const games = await searchGames(title);
    if (games.length > 0) {
      const gameDetails = await getGameDetails(games[0].id);
      const gameScreenshots = await getGameScreenshots(games[0].id);
      setRawgData(gameDetails);
      setScreenshots(gameScreenshots);
      setSelectedScreenshots([]);
    } else {
      setRawgData(null);
      setScreenshots([]);
    }
    setLoading(false);
  }, []);

  const handleScreenshotToggle = useCallback((id: number) => {
    setSelectedScreenshots((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((screenshotId) => screenshotId !== id)
        : [...prevSelected, id]
    );
  }, []);

  const handleSave = useCallback(() => {
    if (!rawgData) return;
    
    const selectedScreenshotsData = screenshots.filter((screenshot) =>
      selectedScreenshots.includes(screenshot.id)
    );

    const gameToSave = {
      ...deal,
      description_raw: rawgData.description_raw,
      background_image: rawgData.background_image,
      genres: rawgData.genres,
      platforms: rawgData.platforms,
      released: rawgData.released,
      developers: rawgData.developers,
      publishers: rawgData.publishers,
      screenshots: selectedScreenshotsData,
      link,
    } as SavedDeal;

    setSavedDeals([...savedDeals, gameToSave]);
    console.log("Saved Deals:", [...savedDeals, gameToSave]);

    // Clear the form
    setDeal({});
    setOffers([]);
    setLink("");
    setRawgData(null);
    setScreenshots([]);
    setSelectedScreenshots([]);
  }, [deal, rawgData, screenshots, selectedScreenshots, link, savedDeals]);

  const handleDealsFetched = useCallback((fetchedDeals: Deal[]) => {
    const bestDeals = fetchedDeals.slice(0, 5);
    setOffers(bestDeals);
    if (bestDeals.length > 0) {
      setDeal(bestDeals[0]);
    } else {
      setDeal({});
    }
  }, []);

  const screenshotList = useMemo(() => (
    screenshots.map((screenshot) => (
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
    ))
  ), [screenshots, selectedScreenshots, handleScreenshotToggle]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <Card sx={{ maxWidth: 800, width: '100%', backgroundColor: 'white' }}>
        <CardContent>
          <SearchBar onDealsFetched={handleDealsFetched} onSelectDeal={handleSelectDeal} />
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Título del Juego"
              variant="outlined"
              fullWidth
              value={deal.title || ""}
              onChange={(e) => setDeal({ ...deal, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            {loading && <CircularProgress />}
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={rawgData?.description_raw || ""}
              onChange={(e) => setRawgData({ ...rawgData, description_raw: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="URL de la Imagen"
              variant="outlined"
              fullWidth
              value={rawgData?.background_image || ""}
              onChange={(e) => setRawgData({ ...rawgData, background_image: e.target.value })}
              sx={{ mb: 2 }}
            />
            {rawgData?.background_image && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img src={rawgData.background_image} alt={deal.title} style={{ maxWidth: "100%", height: "auto" }} />
              </Box>
            )}
            {screenshots.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", mb: 2 }}>
                {screenshotList}
              </Box>
            )}
            <TextField
              label="Géneros"
              variant="outlined"
              fullWidth
              value={rawgData?.genres?.map((genre) => genre.name).join(", ") || ""}
              onChange={(e) => setRawgData({ ...rawgData, genres: e.target.value.split(", ").map(name => ({ name })) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Plataformas"
              variant="outlined"
              fullWidth
              value={rawgData?.platforms?.map((platform) => platform.platform.name).join(", ") || ""}
              onChange={(e) => setRawgData({ ...rawgData, platforms: e.target.value.split(", ").map(name => ({ platform: { name } })) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Fecha de Lanzamiento"
              variant="outlined"
              fullWidth
              value={rawgData?.released || ""}
              onChange={(e) => setRawgData({ ...rawgData, released: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Desarrolladores"
              variant="outlined"
              fullWidth
              value={rawgData?.developers?.map((developer) => developer.name).join(", ") || ""}
              onChange={(e) => setRawgData({ ...rawgData, developers: e.target.value.split(", ").map(name => ({ name })) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Editores"
              variant="outlined"
              fullWidth
              value={rawgData?.publishers?.map((publisher) => publisher.name).join(", ") || ""}
              onChange={(e) => setRawgData({ ...rawgData, publishers: e.target.value.split(", ").map(name => ({ name })) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Precio Normal"
              variant="outlined"
              fullWidth
              value={deal.normalPrice?.toString() || ""}
              onChange={(e) => setDeal({ ...deal, normalPrice: parseFloat(e.target.value) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Precio de Oferta"
              variant="outlined"
              fullWidth
              value={deal.salePrice?.toString() || ""}
              onChange={(e) => setDeal({ ...deal, salePrice: parseFloat(e.target.value) })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Enlace de la Oferta"
              variant="outlined"
              fullWidth
              value={link}
              onChange={(e) => setLink(e.target.value)}
              sx={{ mb: 2 }}
            />
            {offers.length > 0 && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="select-offer-label">Seleccionar Oferta</InputLabel>
                <Select
                  labelId="select-offer-label"
                  value={offers.find(offer => offer.dealID === deal.dealID) ? deal.dealID : ''}
                  label="Seleccionar Oferta"
                  onChange={(e) => {
                    const selectedDeal = offers.find(offer => offer.dealID === e.target.value);
                    if (selectedDeal) {
                      handleSelectDeal(selectedDeal);
                    }
                  }}
                >
                  {offers.map((offer) => (
                    <MenuItem key={offer.dealID} value={offer.dealID}>
                      {`${offer.title} - ${offer.storeName} - $${offer.salePrice.toFixed(2)} (Normal Price: $${offer.normalPrice.toFixed(2)}) - ${((1 - offer.salePrice / offer.normalPrice) * 100).toFixed(2)}% off`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
              Guardar Oferta
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminAddOfferForm;
